import { Navigate, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import useLoginTransition from '../hooks/useLoginTransition';

export default function AuthRedirect({ children }) {
  const { user, isLoggedIn } = useUser();
  const { isLoading, error } = useLoginTransition();

  console.log('isLoggedIn', isLoggedIn);

  if (user) return children;
  else if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>An error occured. Try reloading</div>;
  else return <Navigate to="/login" replace />;
}
