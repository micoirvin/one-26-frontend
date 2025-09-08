import {
  finalizeVideoUpload,
  getNewUploadId,
  uploadVideoChunk,
} from './apiRequests';

export default async function uploadVideo(blob) {
  let uploadId = null;

  try {
    uploadId = (await getNewUploadId()).id;
  } catch (error) {
    console.error('Failed to generate id');
  }

  const chunks = sliceBlob(blob);
  const totalChunks = chunks.length;
  console.log('uploadable chunks', chunks);

  for (let i = 0; i < chunks.length; i++) {
    const formData = new FormData();
    formData.append('chunk', chunks[i]);
    formData.append('chunkIndex', i);
    formData.append('totalChunks', totalChunks);
    formData.append('uploadId', uploadId);
    await uploadVideoChunk(formData);
  }

  await finalizeVideoUpload(uploadId);
}

const sliceBlob = (blob) => {
  const chunks = [];
  const chunkSize = 4 * 1024 * 1024;
  let offset = 0;
  while (offset < blob.size) {
    chunks.push(blob.slice(offset, offset + chunkSize));
    offset += chunkSize;
  }
  return chunks;
};
