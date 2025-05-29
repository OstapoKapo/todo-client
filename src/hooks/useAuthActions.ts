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
    } catch (error: unknown) {
      let message = 'An unexpected error occurred during login.';
      if (error instanceof Error) {
          message = error.message;
      } else if (typeof error === 'string') {
          message = error;
      }  
      throw new Error(message);
      }
  };

  const handleLogIn = async (email: string, password: string): Promise<void> => {
    try {
      await logIn(email, password);
      
      router.push('/');
    } catch (error: unknown) {
      let message = 'An unexpected error occurred during login.';
      if (error instanceof Error) {
          message = error.message;
      } else if (typeof error === 'string') {
          message = error;
      }  
      throw new Error(message);
    }
  };



  return {
    handleSignIn,
    handleLogIn
  };

}