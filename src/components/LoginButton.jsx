import { useGoogleLogin } from '@react-oauth/google';
import useUser from '../hooks/useUser';
import urlToBackend from '../utils/urlToBackend';
import vars from '../vars';

import { hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { useState } from 'react';

export default function LoginButton() {
  const { G_SCOPES } = vars();
  const { setIsLoggedIn } = useUser();
  const [accessMessage, setAccessMessage] = useState('');

  const signIn = useGoogleLogin({
    flow: 'implicit',
    scope: G_SCOPES,
    onSuccess: (response) => {
      const hasAccess = hasGrantedAllScopesGoogle(response, G_SCOPES);
      if (!hasAccess) {
        setAccessMessage('User did not give necessary permissions');
        throw new Error('User did not give necessary permissions');
      }
      fetch(urlToBackend('/auth/google'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: response.access_token }),
      })
        .then(async (response) => {
          if (!response.ok) return;
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <div className="flex flex-col gap-4 max-w-96">
      <button className="button-tertiary" onClick={signIn}>
        Sign in using Google
      </button>
      <p>{accessMessage}</p>
    </div>
  );
}
