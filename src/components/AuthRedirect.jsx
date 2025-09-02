import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AuthRedirect({ children }) {
  const userJwt = localStorage.getItem('userJwt');
  return userJwt ? children : <Navigate to="/login" replace />;
}
