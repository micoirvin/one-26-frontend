import useUploading from '../hooks/useUploading';

export default function UploadProgressIndicator() {
  const { uploadProgress, isUploading } = useUploading();

  if (isUploading) return <div>Uploading: {uploadProgress} %</div>;
  return null;
}
