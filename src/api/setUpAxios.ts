import axios from 'axios';

export let ADDRESS = 'https://api.github.com';

export const authInstance = axios.create({
  baseURL: ADDRESS,
  timeout: 10000,
});

authInstance.interceptors.request.use(
  config => {
    const token = '';

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
