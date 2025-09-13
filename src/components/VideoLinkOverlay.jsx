import { useEffect, useState } from 'react';
import useUploading from '../hooks/useUploading';

export default function VideoLinkOverlay({ fileLink }) {
  const link = fileLink.current;
  const [show, setShow] = useState(true);
  const { isAwaitingUploadReset } = useUploading();

  useEffect(() => {
    setShow(isAwaitingUploadReset);
  }, [isAwaitingUploadReset]);

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  if (isValidUrl(link) && show)
    return (
      <div className="w-full h-full absolute inset-0 flex gap-4 items-center justify-center">
        <div className="w-full h-full absolute inset-0 bg-tertiary opacity-30 z-0"></div>
        <a className="button relative z-1" target="_blank" href={link}>
          Go to Video
        </a>

        <button
          className="button-secondary absolute top-4 right-4"
          onClick={handleToggle}
        >
          close
        </button>
      </div>
    );

  if (isValidUrl(link))
    return (
      <a
        className="button-secondary absolute top-4 right-4"
        target="_blank"
        href={link}
      >
        Go to Video
      </a>
    );
  return null;
}
