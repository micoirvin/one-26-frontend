import { useEffect, useRef } from 'react';
import useRefState from './useRefState';

export default function useCameraFeed(cameraStream, screenStream) {
  const cameraVideoRef = useRef(null);
  const [willPip, setWillPip, willPipRef, setWillPip2] = useRefState(
    cameraStream && screenStream
  );

  const tryPip = async () => {
    try {
      if (willPipRef.current) {
        console.log('try PiP');
        if (cameraVideoRef.current.readyState < 3) return;
        await cameraVideoRef.current.requestPictureInPicture();
        willPipRef.current = false;
        console.log('Now on PiP');
      } else {
        if (!document.pictureInPictureElement) return;
        console.log('exitingpip');
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  };

  useEffect(() => {
    console.log('new cam stream', cameraStream);
    cameraVideoRef.current.srcObject = cameraStream;
  }, [cameraStream]);

  useEffect(() => {
    setWillPip2(cameraStream && screenStream);
  }, [cameraStream, screenStream]);

  useEffect(() => {
    tryPip();
  }, [willPip, cameraStream]);

  useEffect(() => {
    const videoEl = cameraVideoRef.current;

    const handleLoadedData = () => {
      if (willPipRef.current) {
        tryPip();
      }
    };

    videoEl.addEventListener('loadeddata', handleLoadedData);

    videoEl.addEventListener('leavepictureinpicture', (event) => {
      // REMOVE THE CAM STREAM
      setWillPip2(false);
    });

    return () => {
      videoEl.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return {
    cameraVideoRef,
    willPip,
  };
}
