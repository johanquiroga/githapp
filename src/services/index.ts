import axios, { AxiosRequestConfig } from 'axios';
import { merge } from 'lodash';
import { GITHUB_API, GITHUB_KEY } from 'react-native-dotenv';

import { User, ServiceResponse, ErrorServiceResponse } from '../types';

import * as StorageService from '../lib/storage';

import { PER_PAGE } from '../constants';

const github = axios.create({
  baseURL: GITHUB_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `token ${GITHUB_KEY}`,
  },
});

const handleError = (e: Error): ErrorServiceResponse => {
  console.error(e);
  return {
    success: false,
    error: e,
  };
};

export const createUser = async (user: User): Promise<ServiceResponse> => {
  try {
    const key = `user-${user.id}`;
    if ((await StorageService.get(key)) !== null) {
      throw new Error('Item already exists');
    }
    await StorageService.store(key, user);
    return {
      success: true,
      data: {
        userId: user.id,
      },
    };
  } catch (e) {
    return handleError(e);
  }
};

export const getUser = async (id: string): Promise<ServiceResponse> => {
  try {
    const key = `user-${id}`;
    const user = await StorageService.get(key);
    if (user === null) {
      throw new Error('User Not Found');
    }
    return {
      success: true,
      data: {
        user,
      },
    };
  } catch (e) {
    return handleError(e);
  }
};

export const getUserRepos = async (
  username: string,
  config?: AxiosRequestConfig,
): Promise<ServiceResponse> => {
  try {
    const response = await github.get(
      `/users/${username}/repos`,
      merge({ params: { per_page: PER_PAGE } }, config),
    );
    const repos = response.data;
    return {
      success: true,
      data: {
        repos,
      },
    };
  } catch (err) {
    return handleError(err);
  }
};

export const getAllUsers = async (): Promise<ServiceResponse> => {
  try {
    const keys = await StorageService.getAllKeys();

    const users = await Promise.all(keys.map(key => StorageService.get(key)));
    return {
      success: true,
      data: {
        users,
      },
    };
  } catch (err) {
    return handleError(err);
  }
};
