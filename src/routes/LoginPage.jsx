import { Link, Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

import LoginButton from '../components/LoginButton';

import useLoginTransition from '../hooks/useLoginTransition';
import Policies from '../components/Policies';
import About from '../components/About';

export default function LoginPage() {
  const { user } = useUser();
  const { isLoading, error } = useLoginTransition(false);

  return (
    <main>
      <section className="container pt-10 pb-20">
        {user ? (
          <Navigate to="/" />
        ) : isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>An error occured. Try reloading</div>
        ) : (
          <div>
            <LoginButton />
            <div className="mt-4 max-w-96 text-sm font-normal text-justify">
              <Policies />
              <About />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
