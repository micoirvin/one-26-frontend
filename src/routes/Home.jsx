import { useEffect } from 'react';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import useUser from '../hooks/useUser';
import useLoginTransition from '../hooks/useLoginTransition';
import { Navigate } from 'react-router-dom';
import urlToBackend from '../utils/urlToBackend';
import PartRecorder from '../components/PartRecorder';
import MixedRecorder from '@/components/MixedRecorder';
import useInitRootFolder from '../hooks/useInitRootFolder';

export default function Home() {
  const { isAppReady } = useInitRootFolder();
  return (
    <main>
      LOGGED IN
      <Header />
      {/* <Gallery /> */}
      <MixedRecorder isAppReady={isAppReady} />
    </main>
  );
}
