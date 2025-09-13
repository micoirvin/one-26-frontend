import { createContext, useRef, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appDriveRootFolder = useRef(null);
  const appDriveRootFolderLink = useRef(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        appDriveRootFolder,
        appDriveRootFolderLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
