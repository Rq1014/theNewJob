import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config';
import { getAccessToken, useAuthStore } from '../store/authStore';
import type { ApiResponse } from './types';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => {
    const body = response.data as ApiResponse<unknown>;
    if (body && typeof body.code === 'number' && body.code !== 0) {
      return Promise.reject(new Error(body.message || '请求失败'));
    }
    return response;
  },
  async (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      await useAuthStore.getState().logout();
    }
    const message =
      error.response?.data?.message || error.message || '网络错误';
    return Promise.reject(new Error(message));
  },
);

export function unwrap<T>(response: { data: ApiResponse<T> }): T {
  return response.data.data;
}
