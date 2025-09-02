import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const CLIENT_ID =
  '897745564559-kqcinnl857j6ptsj6ep8ll3m4n56a7oj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export default function Login() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    }

    gapi.load('client:auth2', start);
    console.log(gapi.client);
  }, []);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const loginSuccessHandle = (user) => {
    const accessToken = user.getAuthResponse().access_token;
    console.log('Access Token:', accessToken);
    localStorage.setItem('userJwt', accessToken);
    setUser(jwtDecode(accessToken));
    navigate('/');
  };

  const handleLogin = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((user) => loginSuccessHandle(user))
      .catch((err) =>
        console.error('To dev: Build a new flow when error\n', err)
      );
  };

  return <button onClick={handleLogin}>Connect Google Drive</button>;
}
