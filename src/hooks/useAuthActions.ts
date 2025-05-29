'use client';

import { useRouter } from 'next/navigation';

import { logIn, signIn } from '@/services/auth'; 

import {UseAuthActionsReturn} from '@/types';

export const useAuthActions = (): UseAuthActionsReturn => {
  const router = useRouter();

  const handleSignIn = async (email: string, password: string, name: string, role: "admin" | "viewer" | "editor"): Promise<void> => {
    try {
      await signIn(email, password, name, role);
      
      router.push('/');
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || 'Unknown error';
    
        throw new Error(message);
      }
  };

  const handleLogIn = async (email: string, password: string): Promise<void> => {
    try {
      await logIn(email, password);
      
      router.push('/');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Unknown error';
  
      throw new Error(message);
    }
  };



  return {
    handleSignIn,
    handleLogIn
  };

}