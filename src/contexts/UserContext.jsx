import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const userJwt = localStorage.getItem('userJwt') ?? null;
  const [user, setUser] = useState(userJwt ? jwtDecode(userJwt) : null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
