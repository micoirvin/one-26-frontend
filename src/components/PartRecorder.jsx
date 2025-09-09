import { useEffect, useRef, useState } from 'react';
import CameraFeed from './CameraFeed';
import useRecorder from '../hooks/useRecorder';
import useMixedRecorder from '../hooks/useMixedRecorder';

export default function PartRecorder({ streamType, setStream, disabled }) {
  const { startMedia } = useRecorder(streamType);

  const handleClick = async () => {
    setStream(await startMedia());
  };

  return (
    <button className="border p-2" onClick={handleClick} disabled={disabled}>
      {streamType}
    </button>
  );
}
