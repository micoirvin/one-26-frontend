import { Navigate, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import useLoginTransition from '../hooks/useLoginTransition';

export default function AuthRedirect({ children }) {
  const { user, isLoggedIn } = useUser();
  const { isLoading, error } = useLoginTransition();

  console.log('isLoggedIn', isLoggedIn);

  if (user) return children;
  else if (isLoading)
    return (
      <main>
        <section className="container py-8">
          <div>
            Please wait... Our free service may take time for the initial load.
          </div>
        </section>
      </main>
    );
  else if (error)
    return (
      <main>
        <section className="container py-8">
          <div>An error occured. Try reloading</div>
        </section>
      </main>
    );
  else return <Navigate to="/login" replace />;
}
