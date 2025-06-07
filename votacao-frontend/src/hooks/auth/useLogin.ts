import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import type { LoginResponse, Credentials } from "@/services/authService";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, Credentials, unknown>({
    mutationFn: authService.login,
    onSuccess: (data: LoginResponse, variables: Credentials) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userCpf", variables.cpf);
      }
      window.location.href = "/candidates";
    },
    onError: (error) => {
      console.error("Erro no login:", error.message);
    },
  });
};
