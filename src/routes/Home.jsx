import { useEffect } from 'react';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import useUser from '../hooks/useUser';
import useLoginTransition from '../hooks/useLoginTransition';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { accessToken, user, setUser } = useUser();

  return (
    <main>
      LOGGED IN
      <Header />
      {/* <Gallery /> */}
    </main>
  );
}
