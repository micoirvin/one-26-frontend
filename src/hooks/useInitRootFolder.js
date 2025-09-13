import { useEffect, useState } from 'react';
import urlToBackend from '../utils/urlToBackend';
import useUser from './useUser';

export default function useInitRootFolder() {
  const { user, appDriveRootFolder, appDriveRootFolderLink } = useUser();
  const [isAppReady, setIsAppReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (appDriveRootFolder.current) return;
    const wrap = async () => {
      try {
        const response = await fetch(urlToBackend('/api/find-one-26'), {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error();
        const json = await response.json();
        console.log('one-26 root', json);
        appDriveRootFolder.current = json.id;
        appDriveRootFolderLink.current = json.webViewLink;
        setIsAppReady(true);
        setError(null);
      } catch (err) {
        console.error(err);
        setIsAppReady(false);
        setError(err);
      }
    };
    wrap();
  }, [user]);
  return {
    isAppReady,
    error,
  };
}
