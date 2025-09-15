import { googleLogout } from '@react-oauth/google';
import urlToBackend from '../utils/urlToBackend';

export default function Logout({ cancel }) {
  const handleLogout = async () => {
    try {
      googleLogout();
      const response = await fetch(urlToBackend('/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
      console.log(response);
      if (!response.ok) throw new Error(response.statusText);
      window.location.reload(true);
      console.log('/login');
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="fixed inset-0 h-full w-full flex items-center justify-center z-10">
      <div
        className="absolute inset-0 h-full w-full  bg-[#00000099]"
        onClick={cancel}
      ></div>
      <button
        className="button relative z-10 py-3 px-4 min-w-32"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
