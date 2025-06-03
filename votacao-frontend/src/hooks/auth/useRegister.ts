import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import type { LoginResponse } from '@/services/authService';

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data: LoginResponse) => {
      console.log('Registro bem-sucedido:', data);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      window.location.href = '/candidates';
    },
    onError: (error) => {
      console.error('Erro no registro:', error.message);
    },
  });
}; 