interface User {
    cpf: string;
    name?: string;
    email?: string;
  }
  
  export const useAuth = () => {
    const isAuthenticated = (): boolean => {
      return !!localStorage.getItem('token');
    };

    const getUser = (): User | null => {
      const cpf = localStorage.getItem('userCpf');
      const name = localStorage.getItem('userName');
      const email = localStorage.getItem('userEmail');
  
      if (!cpf) return null;
  
      return {
        cpf,
        name: name || undefined,
        email: email || undefined,
      };
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userCpf');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      console.log('🚪 Usuário deslogado');
      window.location.href = '/login';
    };

    const getToken = (): string | null => {
      return localStorage.getItem('token');
    };
  
    return {
      user: getUser(),
      isAuthenticated: isAuthenticated(),
      logout,
      getToken,
    };
  };

  export const cleanCpf = (cpf: string): string => {
    return cpf.replace(/\D/g, '');
  };
  
  export const formatCpf = (cpf: string): string => {
    const cleaned = cleanCpf(cpf);
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  export const maskCpf = (cpf: string): string => {
    const cleaned = cleanCpf(cpf);
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4');
  };