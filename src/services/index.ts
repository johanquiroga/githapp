import axios, { AxiosRequestConfig, AxiosError } from 'axios';
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

const handleInternalError = (e: Error): ErrorServiceResponse => {
  console.error(e);
  return {
    success: false,
    error: e,
  };
};

const handleHttpError = (e: AxiosError<{ message: string }>): ErrorServiceResponse => {
  if (e.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(e.response);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
    return {
      success: false,
      error: new Error(e.response.data.message),
    };
  }
  if (e.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(e.request);
    e.message = 'Internal Error'; // eslint-disable-line
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', e.message);
  }

  console.log(e.config);
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
    return handleInternalError(e);
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
    return handleInternalError(e);
  }
};

export const getUserRepos = async (
  username: string,
  searchTerm: string,
  config?: AxiosRequestConfig,
): Promise<ServiceResponse> => {
  try {
    let q = `user:${username}`;

    if (searchTerm) {
      q = `${searchTerm}+${q}`;
    }

    const response = await github.get(
      `/search/repositories?q=${q}`,
      merge({ params: { per_page: PER_PAGE } }, config),
    );
    const repos = response.data.items;
    return {
      success: true,
      data: {
        repos,
      },
    };
  } catch (err) {
    return handleHttpError(err);
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
    return handleInternalError(err);
  }
};

export const checkUsername = async (
  username: string,
  config?: AxiosRequestConfig,
): Promise<ServiceResponse> => {
  try {
    await github.get(`/users/${username}`, config);
    return { success: true, data: { exists: true } };
  } catch (err) {
    return handleHttpError(err);
  }
};
