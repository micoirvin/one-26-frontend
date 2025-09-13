import useCameraFeed from '../hooks/useCameraFeed';

export default function CameraFeed({ cameraStream, screenStream }) {
  const { cameraVideoRef, willPip } = useCameraFeed(cameraStream, screenStream);
  const showVideo = cameraStream && !willPip;

  return (
    <div
      className={
        'max-w-[40rem] ' + (showVideo ? '' : 'invisible pointer-events-none')
      }
    >
      <video
        muted
        ref={cameraVideoRef}
        autoPlay
        className={'rounded-lg border border-2 border-tertiary w-full h-auto'}
      />
    </div>
  );
}
