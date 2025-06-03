import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Candidates } from './pages/Candidates'

import { PrivateRoute } from './components/PrivateRoute/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/candidates',
        element: <Candidates />
      }
    ]
  },
  {
    path: '*',
    element: <div>Página não encontrada</div>
  }
]) 