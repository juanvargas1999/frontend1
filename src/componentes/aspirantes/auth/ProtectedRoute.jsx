import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (requireAuth && !isLoggedIn) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/aspirantes/login" replace />;
  }
  
  if (!requireAuth && isLoggedIn) {
    // Redirigir al dashboard si ya está autenticado (para login/register)
    return <Navigate to="/aspirantes/dashboard" replace />;
  }
  
  return children;
};

export default ProtectedRoute;