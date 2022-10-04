import axios from 'axios';

export let ADDRESS = 'https://api.github.com';

export const authInstance = axios.create({
  baseURL: ADDRESS,
  timeout: 10000,
});

authInstance.interceptors.request.use(
  config => {
    const token = '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';

    config.headers = {
      ...config.headers,
      Authorization: !token ? '' : `Bearer ${token}`,
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
