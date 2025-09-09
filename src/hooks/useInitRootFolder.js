import { useEffect, useState } from 'react';
import urlToBackend from '../utils/urlToBackend';
import useUser from './useUser';

export default function useInitRootFolder() {
  const { user, appDriveRootFolder } = useUser();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (!user) return;
    const wrap = async () => {
      try {
        const response = await fetch(urlToBackend('/api/find-one-26'), {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        console.log('one-26 root', json.id);
        appDriveRootFolder.current = json.id;
        console.log(appDriveRootFolder.current);
        setIsAppReady(true);
      } catch (error) {
        throw new Error("Can't get one-26");
      }
    };
    wrap();
  }, [user]);
  return {
    isAppReady,
  };
}
