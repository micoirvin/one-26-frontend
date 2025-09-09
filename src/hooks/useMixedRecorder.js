import { useEffect, useState, useRef } from 'react';
import useRefState from './useRefState';
import useUploadChunking from './useUploadChunking';

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
  const blob = useRef(null);

  const { rawChunks, setRawChunks, startNewUpload, stopCurrentUpload } =
    useUploadChunking();

  useEffect(() => {
    const streams = [];

    if (screenStream) streams.push(...screenStream.getTracks());
    else if (cameraStream) streams.push(...cameraStream.getTracks());
    else return;
    // let's add audio-only in the future

    if (microphoneStream) streams.push(...microphoneStream.getTracks());

    const aMixedStream = new MediaStream(streams);
    const aRecorder = new MediaRecorder(aMixedStream);

    aMixedStream.oninactive = () => {
      console.log('mixedStream is no longer active');
      stopRecording();
    };

    aRecorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
      setRawChunks((prev) => [...prev, e.data]);

      console.log('isrec', isRecordingRef.current);
      if (isRecordingRef.current) return;
      else handleStop();
      console.log('data saved, recorder stopped');
    };

    setMixedStream(aMixedStream);
    setRecorder2(aRecorder);
  }, [screenStream, cameraStream, microphoneStream]);

  useEffect(() => {
    console.log(
      'cam, mic, screen, mixed',
      cameraStream,
      microphoneStream,
      screenStream,
      mixedStream
    );
  }, [mixedStream]);

  useEffect(() => {
    console.log('isrecording', isRecordingRef.current);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording2(true);
    startNewUpload();
    recorderRef.current.start(1000);
  };

  const stopRecording = () => {
    setIsRecording2(false);
    recorderRef.current.stop();
  };

  const handleStop = () => {
    console.log('handleStop', 'isrecording', isRecordingRef.current);
    if (isRecordingRef.current || chunks.current.length <= 0) return;

    const aBlob = new Blob(chunks.current, { type: 'video/webm' });
    chunks.current = [];

    setVideoURL(URL.createObjectURL(aBlob));
    blob.current = aBlob;
    stopCurrentUpload();
  };

  return {
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
  };
}
