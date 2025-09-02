import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { jwtDecode } from 'jwt-decode';

export default function OldLogin() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const loginSuccessHandle = (credentialResponse) => {
    localStorage.setItem('userJwt', credentialResponse.credential);
    setUser(jwtDecode(credentialResponse.credential));
    console.log('navnvnv');
    navigate('/');
  };

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/drive.file',
    onSuccess: loginSuccessHandle,
    onError: (error) => console.error(error),
  });

  return (
    <GoogleOAuthProvider clientId="802502323826-e6kpnqkeki3v3mqfo7ekp0fqp9fbdipf">
      <button onClick={() => login()}></button>
    </GoogleOAuthProvider>
  );
}
