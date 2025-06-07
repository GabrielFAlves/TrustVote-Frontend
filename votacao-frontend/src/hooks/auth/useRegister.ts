// hooks/auth/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data, variables) => {
      // Salvar token e CPF
      localStorage.setItem('token', data.token);
      localStorage.setItem('userCpf', variables.cpf.replace(/\D/g, ''));
      
      toast.success("Conta criada! Redirecionando...");
      
      // Ir para votação
      setTimeout(() => window.location.href = '/candidates', 12000);
    },
    onError: (error) => {
      toast.error("Erro ao criar conta", { description: error.message });
    },
  });
};