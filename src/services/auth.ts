// services/auth.ts
import api from '@/utils/index';
import axios from 'axios';
import { ApiErrorResponse } from '@/types';

export const logIn = async (email: string, password: string) => {
  try{
    await api.post('/auth/login', { email, password });
  }
  catch (error) {
    handleError(error);
  }
}


export const signIn = async (email: string, password: string, name: string, role: "admin" | "viewer" | "editor") => {
  try{
    await api.post('/auth/signIn', { email, password, name, role });
  }
  catch (error) {
    handleError(error);
  }
}

export const logout = () => api.post('/auth/logout');

export const checkAuth = () => api.get('/auth/check');

function handleError(error: unknown): void {
  if (axios.isAxiosError(error) && error.response) {
    const errorData = error.response.data as ApiErrorResponse;
    throw new Error(errorData.message || 'Unknown API login error');
  }
  throw new Error('Network error or unexpected API error.');
}
