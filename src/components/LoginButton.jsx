import { useGoogleLogin } from '@react-oauth/google';
import useUser from '../hooks/useUser';
import urlToBackend from '../utils/urlToBackend';
import vars from '../vars';

export default function LoginButton() {
  const { G_SCOPES } = vars();
  const { setIsLoggedIn } = useUser();

  const signIn = useGoogleLogin({
    flow: 'implicit',
    scope: G_SCOPES,
    onSuccess: (response) => {
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

  return <button onClick={signIn}>Sign in using Google</button>;
}
