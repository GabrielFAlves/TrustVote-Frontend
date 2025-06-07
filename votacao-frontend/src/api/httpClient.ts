// services/httpClient.js
import axios from 'axios';

// Detectar ambiente automaticamente
const isDevelopment = import.meta.env.DEV;

// Função para definir a base URL
const getBaseURL = () => {
  if (isDevelopment) {
    console.log('🔧 DESENVOLVIMENTO - Usando proxy local');
    return '/api'; // Proxy local
  } else {
    console.log('🌐 PRODUÇÃO - Usando URL direta');
    return 'https://trustvote-backend-2.onrender.com/api'; // URL direta
  }
};

const baseURL = getBaseURL();
console.log('📍 Base URL configurada:', baseURL);
console.log('🔍 Ambiente:', isDevelopment ? 'Desenvolvimento' : 'Produção');

// Configuração do Axios
const httpClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

// Interceptor para requisições
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📤 Fazendo requisição:', config.method?.toUpperCase(), config.url);
    console.log('🔗 URL completa:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
httpClient.interceptors.response.use(
  (response) => {
    console.log('📥 Resposta recebida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      console.log('🚪 Token inválido, redirecionando para login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || 
                   error.response?.data?.error || 
                   error.message || 
                   'Erro desconhecido';
    
    return Promise.reject(new Error(message));
  }
);

export { httpClient };