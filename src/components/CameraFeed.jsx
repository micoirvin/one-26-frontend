import { useEffect, useRef } from 'react';
import useMixedRecorder from '../hooks/useMixedRecorder';

export default function CameraFeed({ cameraStream }) {
  const cameraVideoRef = useRef(null);

  useEffect(() => {
    console.log('camstream', cameraStream);
    if (!cameraStream) return;
    cameraVideoRef.current.srcObject = cameraStream;
  }, [cameraStream]);

  return (
    <div>
      camera feed
      <video
        muted
        ref={cameraVideoRef}
        autoPlay
        style={{ width: 200 }}
        className="outline"
      />
    </div>
  );
}
