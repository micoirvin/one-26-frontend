import PartRecorder from './PartRecorder';
import useUploading from '../hooks/useUploading';
import ElapsedTimeIndicator from './ElapsedTimeIndicator';

export default function MixedRecorder({ mixedRecorder, children }) {
  const {
    cameraStream,
    microphoneStream,
    screenStream,
    setCameraStream,
    setMicrophoneStream,
    setScreenStream,
    recorder,
    isRecording,
    startRecording,
    stopRecording,
    stopButton,
    elapsedTime,
  } = mixedRecorder;

  const { isAwaitingUploadReset } = useUploading();

  const isPartRecorderDisabled =
    (recorder && isRecording) || isAwaitingUploadReset;

  return (
    <div className="flex gap-8 flex-col items-stretch pb-12 sm:flex-row">
      <div className="w-full flex flex-col gap-8 max-w-80 sm:gap-4">
        <div className="flex gap-2 flex-col items-stretch sm:flex-row">
          <PartRecorder
            streamType={'camera'}
            setStream={setCameraStream}
            stream={cameraStream}
            disabled={isPartRecorderDisabled}
          />
          <PartRecorder
            streamType={'microphone'}
            setStream={setMicrophoneStream}
            stream={microphoneStream}
            disabled={isPartRecorderDisabled}
          />
          <PartRecorder
            streamType={'screen'}
            setStream={setScreenStream}
            stream={screenStream}
            disabled={isPartRecorderDisabled}
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="button"
            disabled={!recorder || isRecording || isAwaitingUploadReset}
            onClick={startRecording}
          >
            Start Recording
          </button>

          <button
            type="button"
            className="button"
            disabled={!recorder || !isRecording || isAwaitingUploadReset}
            onClick={stopRecording}
            ref={stopButton}
          >
            Stop Recording
          </button>
        </div>

        <ElapsedTimeIndicator elapsedTime={elapsedTime} />
      </div>
      {children}
    </div>
  );
}
