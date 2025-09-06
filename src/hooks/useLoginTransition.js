import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../functionality/apiRequests';

export default function useLoginTransition(willForceFetch = true) {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const willFetch = willForceFetch || isLoggedIn;
    if (!willFetch) return setIsLoading(false);

    if (user) return setIsLoggedIn(true);

    setIsLoading(true);

    const wrap = async () => {
      try {
        const data = await getUserInfo();
        console.log('data', data);
        if (data) {
          setUser(data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setError(error);
      }
      return setIsLoading(false);
    };
    wrap();
  }, [isLoggedIn]);

  return { isLoading, error };
}
