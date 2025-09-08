export default function RecordedVideo({ videoURL }) {
  return (
    <div>
      <h2>Recorded Video:</h2>
      <video src={videoURL} controls style={{ width: 200 }} />
      <br />
      <a href={videoURL} download="recorded-video.webm">
        <button>Download Video</button>
      </a>
    </div>
  );
}
