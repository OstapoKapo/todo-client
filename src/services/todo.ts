import api from '@/utils/index';
import axios from 'axios';
import { ApiErrorResponse, User, Todo } from '@/types';


export const getAllTodo = async (): Promise<Todo[] | undefined> => {
  try{
    const response = await api.get('/todos/all');
    return response.data as Todo[]; 
  }
  catch (error) {
    handleError(error);
  }
}
export const updateTodo = async (role: "admin" | "viewer" | "editor", userId: string): Promise<User | undefined> => {
  try{
    const response = await api.patch(`/user/${userId}`, {role});
    return response.data.user as User; 
  }catch (error) {
    handleError(error);
  }
}
export const deleteTodo = async (userId: string): Promise<Todo[] | undefined> => {
  try{
    const response = await api.delete(`/todos/${userId}`);
    return response.data as Todo[];
  }catch (error) {
    handleError(error);
  }
}

export const createdTodo = async (doto:Todo): Promise<Todo[] | undefined> => {
    try{
      const response = await api.post(`/todos/`, doto);
      return response.data as Todo[];
    }catch (error) {
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