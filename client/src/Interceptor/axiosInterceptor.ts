import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { url } from '../utils/baseUrl';

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Define a custom interface for AxiosRequestConfig to include headers
interface CustomAxiosConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
  };
}

axiosInstance.interceptors.request.use(
  async (config: CustomAxiosConfig) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await axiosInstance.post(`${url}/oauth/token`, {
            token: JSON.parse(refreshToken),
          });

          localStorage.setItem('access_token', JSON.stringify(response.data.access_token));

          axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token:', err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const httpRequest = axiosInstance;
