import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';

export default function GlobalStates({ children }) {
  const CLIENT_ID = 'willbedeleted';
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <UserProvider>{children}</UserProvider>
    </GoogleOAuthProvider>
  );
}
