export default function ElapsedTimeIndicator({ elapsedTime }) {
  const mmss = new Date(elapsedTime * 1000).toISOString().slice(14, 19);
  return <div>{mmss}</div>;
}
