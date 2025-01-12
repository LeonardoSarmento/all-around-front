/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from '@services/state/slice';
import { RootState, store } from '@services/state/store';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

function getToken(state: RootState) {
  return state.auth.token;
}

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    error ? reject(error) : resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const Token = getToken(store.getState());

    if (error.response.status === 401 && Token === null) {
      toast.error('Faça a autentificação', {
        description: 'Verificamos que você ainda não possui um token.',
      });
      store.dispatch(logout());
    }
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      Token !== null &&
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/login'
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api
          .post('/auth/refresh')
          .then(async ({ data }) => {
            processQueue(null, data.Token);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            toast.error('Indentificação não encontrada.', { description: 'Faça o login novamente.' });
            store.dispatch(logout());
            failedQueue.push({ resolve, reject });

            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);

export default api;

export function GET<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  return api.get(url, config);
}

export function GETWithQueries<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  query: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> {
  return api.get(url, {
    ...config,
    params: query,
    paramsSerializer: { indexes: null },
  });
}

export function POST<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> {
  return api.post(url, body, config);
}

export function PATCH<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> {
  return api.patch(url, body, config);
}

export function DELETE<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
): Promise<R> {
  return api.delete(url, config);
}

export function DELETEWithQueries<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  query: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> {
  return api.delete(url, { ...config, params: query, paramsSerializer: { indexes: null } });
}
