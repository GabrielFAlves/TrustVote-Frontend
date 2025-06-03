// hooks/useLogin.js
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import type { LoginResponse, Credentials } from '@/services/authService';

export const useLogin = () => {
  return useMutation<LoginResponse, Error, Credentials, unknown>({
    mutationFn: authService.login,
    onSuccess: (data: LoginResponse) => {
      console.log('Login bem-sucedido:', data);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      window.location.href = '/candidates';
    },
    onError: (error) => {
      console.error('Erro no login:', error.message);
    },
  });
};