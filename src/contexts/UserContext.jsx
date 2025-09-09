import { createContext, useRef, useState } from 'react';
import { getUserInfo } from '../functionality/apiRequests';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appDriveRootFolder = useRef(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        appDriveRootFolder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
