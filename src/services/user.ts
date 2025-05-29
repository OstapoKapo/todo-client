import api from '@/utils/index';
import axios from 'axios';
import { ApiErrorResponse, User } from '@/types';


export const getAllUsers = async (): Promise<User[] | undefined> => {
  try{
    const response = await api.get('/user/');
    return response.data.users as User[]; 
  }
  catch (error) {
    handleError(error);
  }
}

function handleError(error: unknown): void {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ApiErrorResponse;
      throw new Error(errorData.message || 'Unknown API login error');
    }
    throw new Error('Network error or unexpected API error.');
  }