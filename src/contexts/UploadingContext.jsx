import { createContext, useState } from 'react';
import io from 'socket.io-client';
import urlToBackend from '../utils/urlToBackend';

export const UploadingContext = createContext();

export default function UploadingProvider({ children }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isAwaitingUploadReset, setIsAwaitingUploadReset] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [hasTriedUpload, setHasTriedUpload] = useState(false);

  const socket = io(urlToBackend('/'));

  socket.on('uploadProgress', (data) => {
    console.log(`Progress: ${data.percentage}%`);
    setUploadProgress(data.percentage);
  });

  return (
    <UploadingContext.Provider
      value={{
        isUploading,
        setIsUploading,
        uploadProgress,
        setIsAwaitingUploadReset,
        isAwaitingUploadReset,
        uploadSuccess,
        setUploadSuccess,
        hasTriedUpload,
        setHasTriedUpload,
      }}
    >
      {children}
    </UploadingContext.Provider>
  );
}
