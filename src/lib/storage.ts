import AsyncStorage from '@react-native-community/async-storage';

import { PREFIX } from '../constants';

export const store = async (key: string, value: Record<string, any>) => {
  const prefixedKey = `@${PREFIX}:${key}`;
  try {
    await AsyncStorage.setItem(prefixedKey, JSON.stringify(value));
    return prefixedKey;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error('Error serializing data'));
  }
};

export const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${PREFIX}:${key}`);
    if (value !== null) {
      return JSON.parse(value);
    }
    throw new Error('Key Not Found');
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error('Error getting data'));
  }
};

export const getAllKeys = async (): Promise<string[]> => {
  let keys: string[] = [];
  try {
    keys = (await AsyncStorage.getAllKeys())
      .filter(key => key.startsWith(`@${PREFIX}:`))
      .map(key => key.replace(`@${PREFIX}:`, ''));
  } catch (error) {
    console.error(error);
  }
  return keys;
};
