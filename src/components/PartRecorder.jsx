import { useEffect } from 'react';
import useRecorder from '../hooks/useRecorder';

export default function PartRecorder({
  streamType,
  stream,
  setStream,
  disabled,
}) {
  const { startMedia, isActive, setIsActive } = useRecorder(streamType);

  const handleClick = async () => {
    if (stream) {
      setStream(null);
      setIsActive(false);
    } else {
      setStream(await startMedia());
      setIsActive(true);
    }
  };

  useEffect(() => {
    setIsActive(stream && true);
  }, [stream]);

  return (
    <button
      className={`button-tertiary grow ${isActive ? 'bg-tertiary' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {streamType}
    </button>
  );
}
