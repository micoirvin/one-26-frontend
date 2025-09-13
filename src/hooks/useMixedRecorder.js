import { useEffect, useState, useRef } from 'react';
import useRefState from './useRefState';
import useUploadChunking from './useUploadChunking';
import useUploading from './useUploading';

export default function useMixedRecorder() {
  const [cameraStream, setCameraStream] = useState(null);
  const [microphoneStream, setMicrophoneStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [mixedStream, setMixedStream] = useState(null);
  const chunks = useRef([]);
  const [recorder, setRecorder, recorderRef, setRecorder2] = useRefState(null);
  const [isRecording, setIsRecording, isRecordingRef, setIsRecording2] =
    useRefState(null);
  const [videoURL, setVideoURL] = useState(null);

  const stopButton = useRef(null);
  const blockTime = 1000;

  const [elapsedTime, setElapsedTime] = useState(0);

  const {
    setRawChunks,
    startNewChunksUpload,
    stopChunksUpload,
    triggerUpload,
    uploadPostCleanup,
    fileLink,
    uploadId,
  } = useUploadChunking();

  const { isAwaitingUploadReset } = useUploading();

  useEffect(() => {
    if (isAwaitingUploadReset) return;

    setVideoURL(null);
  }, [isAwaitingUploadReset]);

  useEffect(() => {
    const streams = [];

    if (screenStream) streams.push(...screenStream.getTracks());
    else if (cameraStream) streams.push(...cameraStream.getTracks());
    else {
      setRecorder2(null);
      setMixedStream(null);
      return;
    }
    // let's add audio-only in the future

    if (microphoneStream) streams.push(...microphoneStream.getTracks());

    const aMixedStream = new MediaStream(streams);
    const aRecorder = new MediaRecorder(aMixedStream);

    // no longer necessary?
    // aMixedStream.oninactive = () => {
    //   console.log('mixed stream is no longer active');
    //   stopRecording();
    // };

    if (screenStream) {
      // when screen stream is stopped while browser is not focused
      screenStream.addEventListener('inactive', (e) => {
        console.log('screen stream is no longer active');

        // stopRecording(); --> BUGGY
        stopButton.current.click(); // ---> GOOD
      });
    }

    aRecorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
      setRawChunks((prev) => [...prev, e.data]);
      console.log('isrec', isRecordingRef.current);
      setElapsedTime((prev) => prev + 1);
    };

    aRecorder.onstart = () => {
      setElapsedTime(0);
    };

    aRecorder.onstop = () => {
      setElapsedTime(0);
      console.log('data saved, recorder stopped');
      handleStop();
    };

    setMixedStream(aMixedStream);
    setRecorder2(aRecorder);
  }, [screenStream, cameraStream, microphoneStream]);

  useEffect(() => {
    console.log(
      'cam',
      cameraStream && true,
      'mic',
      microphoneStream && true,
      'screen',
      screenStream && true,
      'mixed',
      mixedStream && true
    );
  }, [mixedStream]);

  const resetStreams = () => {
    console.log('resetStreams');
    console.log(cameraStream, microphoneStream, screenStream);
    setCameraStream(null);
    setMicrophoneStream(null);
    setScreenStream(null);
  };

  const startRecording = async () => {
    const uploadId = await startNewChunksUpload();
    if (!uploadId) return;
    setIsRecording2(true);
    recorderRef.current.start(blockTime);
  };

  const stopRecording = () => {
    console.log('stoprecording');
    setIsRecording2(false);
    if (recorderRef.current) recorderRef.current.stop();
    resetStreams();
  };

  const handleStop = () => {
    console.log('handle stop', 'is recording', isRecordingRef.current);
    if (isRecordingRef.current || chunks.current.length <= 0) return;

    const aBlob = new Blob(chunks.current, { type: 'video/webm' });
    chunks.current = [];

    setVideoURL(URL.createObjectURL(aBlob));
    stopChunksUpload();
  };

  return {
    cameraStream,
    microphoneStream,
    screenStream,
    setCameraStream,
    setMicrophoneStream,
    setScreenStream,
    recorder,
    videoURL,
    isRecording,
    startRecording,
    stopRecording,
    triggerUpload,
    stopButton,
    uploadPostCleanup,
    fileLink,
    uploadId,
    elapsedTime,
  };
}
