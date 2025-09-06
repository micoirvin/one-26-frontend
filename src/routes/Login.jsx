import { Link, Navigate, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

import LoginButton from '../components/LoginButton';
import { useEffect } from 'react';

import useLoginTransition from '../hooks/useLoginTransition';

export default function Login() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isLoading, error } = useLoginTransition(false);

  console.log('loginpage');

  if (user) return <Navigate to="/" />;
  else if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>An error occured. Try reloading</div>;
  else
    return (
      <div>
        <div className="flex gap-8">
          <LoginButton />
          <Link to="/">HOME</Link>
        </div>
      </div>
    );
}
