import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ErrorResponse, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    if (axiosError.response) {
      throw {
        message: axiosError.response.data.message || 'Ocorreu um erro inesperado',
        status: axiosError.response.status,
      };
    } else if (axiosError.request) {
      throw {
        message: 'Servidor não respondeu. Verifique sua conexão.',
        status: 0,
      };
    } else {
      throw {
        message: axiosError.message || 'Erro ao fazer requisição',
        status: 0,
      };
    }
  }
}

export default api;