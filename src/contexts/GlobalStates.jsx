import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';

export default function GlobalStates({ children }) {
  const CLIENT_ID =
    '897745564559-kqcinnl857j6ptsj6ep8ll3m4n56a7oj.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <UserProvider>{children}</UserProvider>
    </GoogleOAuthProvider>
  );
}
