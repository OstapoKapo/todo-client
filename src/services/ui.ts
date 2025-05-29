import api from '@/utils/index';
import axios from 'axios';
import { ApiErrorResponse, UI, User } from '@/types';


export const getUI = async (): Promise<UI | undefined> => {
  try{
    const response = await api.get('/ui/');
    return response.data as UI; 
  }
  catch (error) {
    handleError(error);
  }
}

export const updateUI = async (tittle: string, footer: string) => {
    try{
        const response = await api.patch('/ui/', {tittle, footer});
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