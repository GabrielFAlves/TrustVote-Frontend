import { Navigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

export function PrivateRoute() {
  // Verificar se existe token no localStorage
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Converte para boolean

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}