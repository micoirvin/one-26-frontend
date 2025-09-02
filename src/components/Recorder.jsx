import { useEffect, useRef, useState } from 'react';

function App() {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    console.log('m', mediaRecorder);
  }, [mediaRecorder]);

  useEffect(() => {
    if (recording || chunks.length <= 0) return;
    handleStop();
  }, [recording]);

  // Start webcam
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      console.log('trigger');
      setChunks((prev) => [...prev, e.data]);
    };
    recorder.onstop = () => setRecording(false);
    setMediaRecorder(recorder);
  };

  const handleStop = () => {
    console.log('chunksz', chunks);
    const blob = new Blob(chunks, { type: 'video/webm' });
    console.log('blob', blob, chunks);
    setVideoURL(URL.createObjectURL(blob));
    setChunks([]);
  };

  // Start recording
  const startRecording = () => {
    if (mediaRecorder) {
      setRecording(true);
      console.log('yeah');
      mediaRecorder.start(200);
    }
  };

  // Stop recording
  const stopRecording = () => {
    console.log('chunks', chunks);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h1>Webcam Recorder</h1>
      <video ref={videoRef} autoPlay style={{ width: 400 }} />
      <br />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={startRecording} disabled={!mediaRecorder || recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>

      {console.log('v', videoURL)}

      {videoURL && (
        <div>
          <h2>Recorded Video:</h2>
          <video src={videoURL} controls style={{ width: 400 }} />
          <br />
          <a href={videoURL} download="recorded-video.webm">
            <button>Download Video</button>
          </a>
        </div>
      )}
    </div>
  );
}

// export default App;
