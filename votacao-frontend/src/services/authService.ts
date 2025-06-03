// services/authService.js
import { httpClient } from '../api/httpClient';

export interface UserData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
}

export interface Credentials {
  cpf: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  message: string;
}

// Serviços de autenticação
export const authService = {
  // Registro de usuário
  register: async (userData: UserData): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },

  // Login do usuário
  login: async (credentials: Credentials): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};