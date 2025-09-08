import { useEffect } from 'react';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import useUser from '../hooks/useUser';
import useLoginTransition from '../hooks/useLoginTransition';
import { Navigate } from 'react-router-dom';
import urlToBackend from '../utils/urlToBackend';
import PartRecorder from '../components/PartRecorder';
import MixedRecorder from '@/components/MixedRecorder';

export default function Home() {
  const { accessToken, user, setUser } = useUser();

  const test = () => {
    fetch(urlToBackend('/api/find-one-26'), {
      credentials: 'include',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  };

  return (
    <main>
      LOGGED IN
      <Header />
      {/* <Gallery /> */}
      <button onClick={test}>TEST</button>
      <MixedRecorder />
    </main>
  );
}
