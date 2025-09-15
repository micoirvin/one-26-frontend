import Header from '../components/Header';
import MixedRecorder from '../components/MixedRecorder';
import RecordedVideo from '../components/RecordedVideo';
import useInitRootFolder from '../hooks/useInitRootFolder';
import useMixedRecorder from '../hooks/useMixedRecorder';
import CameraFeed from '../components/CameraFeed';
import useUser from '../hooks/useUser';

export default function Home() {
  const { isAppReady, error } = useInitRootFolder();
  const { appDriveRootFolderLink } = useUser();
  const mixedRecorder = useMixedRecorder();
  const {
    videoURL,
    triggerUpload,
    cameraStream,
    screenStream,
    uploadPostCleanup,
    fileLink,
    uploadId,
  } = mixedRecorder;

  return (
    <main className="pb-32">
      <Header />
      <section className="container">
        {isAppReady ? (
          <>
            <div className="py-4 mb-4 flex flex-col gap-2 items-stretch max-w-80 sm:max-w-none text-xs sm:items-center sm:flex-row sm:justify-end">
              <p>Your recordings are saved in your Google Drive.</p>
              <a
                target="_blank"
                href={appDriveRootFolderLink.current}
                className="button-secondary"
              >
                See All Recordings
              </a>
            </div>
            <MixedRecorder mixedRecorder={mixedRecorder}>
              {videoURL ? (
                <RecordedVideo
                  videoURL={videoURL}
                  triggerUpload={triggerUpload}
                  uploadPostCleanup={uploadPostCleanup}
                  fileLink={fileLink}
                  fileId={uploadId}
                />
              ) : (
                <CameraFeed
                  cameraStream={cameraStream}
                  screenStream={screenStream}
                />
              )}
            </MixedRecorder>
          </>
        ) : error ? (
          <div className="py-4">An error occured. Try reloading.</div>
        ) : (
          <div className="py-4">Loading...</div>
        )}
      </section>

      <footer className="fixed bottom-0 left-0 p-4 w-full text-center bg-white border-t border-tertiary flex gap-4 text-xs justify-center">
        <a href="/about" className="underline">
          About
        </a>
        <a href="/policies" className="underline">
          Policies
        </a>
      </footer>
    </main>
  );
}
