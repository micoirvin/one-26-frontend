import useMixedRecorder from '../hooks/useMixedRecorder';
import PartRecorder from './PartRecorder';
import CameraFeed from './CameraFeed';
import RecordedVideo from './RecordedVideo';

export default function MixedRecorder() {
  const {
    cameraStream,
    setCameraStream,
    setMicrophoneStream,
    setScreenStream,
    recorder,
    videoURL,
    isRecording,
    startRecording,
    stopRecording,
    blob,
  } = useMixedRecorder();

  return (
    <div>
      <div className="flex gap-4">
        <PartRecorder
          streamType={'camera'}
          setStream={setCameraStream}
          disabled={recorder && isRecording}
        />
        <PartRecorder
          streamType={'microphone'}
          setStream={setMicrophoneStream}
          disabled={recorder && isRecording}
        />
        <PartRecorder
          streamType={'screen'}
          setStream={setScreenStream}
          disabled={recorder && isRecording}
        />
      </div>

      <CameraFeed cameraStream={cameraStream} />

      <div className="flex gap-4">
        <button
          type="button"
          disabled={!recorder || isRecording}
          onClick={startRecording}
        >
          start
        </button>
        <button
          type="button"
          disabled={!recorder || !isRecording}
          onClick={stopRecording}
        >
          stop
        </button>
      </div>

      <div>
        {videoURL && <RecordedVideo videoURL={videoURL} blob={blob.current} />}
      </div>
    </div>
  );
}
