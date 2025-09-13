import { use, useEffect, useRef, useState } from 'react';
import UploadProgressIndicator from '../components/UploadProgressIndicator';
import useUploading from '../hooks/useUploading';
import VideoLinkOverlay from './VideoLinkOverlay';
import { removeTempUploads } from '../functionality/apiRequests';

export default function RecordedVideo({
  videoURL,
  triggerUpload,
  uploadPostCleanup,
  fileLink,
  fileId,
}) {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);
  const {
    setIsAwaitingUploadReset,
    setUploadSuccess,
    uploadSuccess,
    hasTriedUpload,
    setHasTriedUpload,
    isUploading,
  } = useUploading();
  const [restartPrompt, setRestartPrompt] = useState(0);
  const restartMessage =
    restartPrompt === 0
      ? 'Restart Recording'
      : restartPrompt === 1
      ? 'Confirm?'
      : '';

  const [cantRestart, setCantRestart] = useState('');
  const [disableButtons, setDisableButtons] = useState(false);

  const sanitizeFileName = (f) => f.replace(/[\/\\:*?"<>|]/g, '-');

  useEffect(() => {
    if (videoURL) {
      setIsAwaitingUploadReset(true);
      setUploadSuccess(false);
      setHasTriedUpload(false);
    }
    const today = new Date();
    const tempName = `Video Recording ${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
    setFileName(sanitizeFileName(tempName));
  }, [videoURL]);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      restartRecording();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setDisableButtons(isUploading);
  }, [isUploading]);

  const handleChange = (e) => {
    setFileName(sanitizeFileName(e.target.value));
  };

  const handleSubmit = () => {
    triggerUpload(fileName);
  };

  const restartRecording = async () => {
    setDisableButtons(true);

    if (fileId.current) {
      const response = await removeTempUploads(fileId.current);
      console.log('fileID to delete', fileId.current);
      console.log(response);

      if (response?.deleted !== fileId.current) return setCantRestart(true);
    }

    setDisableButtons(false);
    setCantRestart(false);
    uploadPostCleanup();
    setIsAwaitingUploadReset(false);
    setHasTriedUpload(false);
    setUploadSuccess(false);
  };

  const confirmRestart = () => {
    if (restartPrompt === 0) return setRestartPrompt((prev) => prev + 1);
    restartRecording();
  };

  return (
    <div className="max-w-[40rem] w-full flex flex-col gap-4 ">
      <div className="relative rounded-lg border border-2 border-tertiary overflow-clip">
        <video src={videoURL} controls className="w-full h-auto" />
        <VideoLinkOverlay fileLink={fileLink} />
      </div>

      <input
        className="p-2 rounded text-lg"
        ref={inputRef}
        autoFocus
        onChange={handleChange}
        value={fileName}
      />

      <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:items-center max-w-80 lg:max-w-none">
        {cantRestart ? (
          <p className="p-2">Something went wrong. Reload.</p>
        ) : hasTriedUpload ? (
          uploadSuccess ? (
            <p className="p-2">Successful Upload!</p>
          ) : (
            <p className="p-2">Sorry. Failed Upload.</p>
          )
        ) : (
          <div className="flex flex-col gap-4 items-stretch md:flex-row md:items-center">
            <button
              type="button md:grow-1 lg:grow-0"
              className="button"
              disabled={disableButtons}
              onClick={handleSubmit}
            >
              Upload Video
            </button>

            <a
              href={videoURL}
              disabled={disableButtons}
              download={`${fileName}.webm`}
              className="p-2 text-center md:grow-1 lg:grow-0"
            >
              Download Video
            </a>
          </div>
        )}

        <button
          className="button-secondary lg:ml-auto"
          disabled={disableButtons}
          onClick={confirmRestart}
        >
          {restartMessage}
        </button>
      </div>

      <UploadProgressIndicator />
    </div>
  );
}
