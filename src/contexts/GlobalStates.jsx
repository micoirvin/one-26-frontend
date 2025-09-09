import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';
import vars from '../vars';

export default function GlobalStates({ children }) {
  const { G_CLIENT_ID } = vars();
  return (
    <GoogleOAuthProvider clientId={G_CLIENT_ID}>
      <UserProvider>{children}</UserProvider>
    </GoogleOAuthProvider>
  );
}
