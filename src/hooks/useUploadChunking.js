import { useEffect } from 'react';
import { useState } from 'react';
import {
  finalizeVideoUpload,
  getNewUploadId,
  uploadVideoChunk,
} from '../functionality/apiRequests';
import { useRef } from 'react';

import useUser from '../hooks/useUser';

export default function useUploadChunking() {
  const [rawChunks, setRawChunks] = useState([]);
  const [uploadableChunks, setUploadableChunks] = useState([]);
  const [isLastUploadSuccess, setIsLastUploadSuccess] = useState(true);
  const [currentUploadableChunk, setCurrentUploadableChunk] = useState([]);
  const [currentUploadableChunkSize, setCurrentUploadableChunkSize] =
    useState(0);

  const uploadId = useRef(null);
  const uploadChunkIndex = useRef(0);
  const rawChunkIndex = useRef(0);
  const finalIndexCheck = useRef(null);

  const [willStopUpload, setWillStopUpload] = useState(false);

  const { appDriveRootFolder } = useUser();

  const startNewUpload = async () => {
    try {
      uploadId.current = (await getNewUploadId()).id;
      console.log('uploadId', uploadId.current);
    } catch (error) {
      throw new Error('Failed to generate id');
    }
  };

  const stopCurrentUpload = () => {
    setWillStopUpload(true);
    return;
    // handle when successful upload
  };

  const handleStopCurrentUpload = async () => {
    setRawChunks([]);
    setUploadableChunks([]);
    setCurrentUploadableChunk([]);
    setCurrentUploadableChunkSize(0);
    uploadChunkIndex.current = 0;
    rawChunkIndex.current = 0;
    setWillStopUpload(false);
    try {
      console.log('appDrive', appDriveRootFolder.current);
      const response = await finalizeVideoUpload(
        uploadId.current,
        appDriveRootFolder.current
      );
      console.log(response);
    } catch (error) {
      throw new Error("Can't finalize upload");
    }
    uploadId.current = null;
  };

  useEffect(() => {
    if (rawChunks.length <= 0) return;

    const maxSize = 1024 * 1024;

    const currentRawChunk = rawChunks[rawChunkIndex.current];

    const aCurrentUploadableChunkSize =
      currentUploadableChunkSize + currentRawChunk.size;

    const aCurrentUploadableChunk = [
      ...currentUploadableChunk,
      currentRawChunk,
    ];

    console.log(
      '[chunks]',
      aCurrentUploadableChunkSize,
      currentUploadableChunk.length
    );

    rawChunkIndex.current = rawChunkIndex.current + 1;

    setCurrentUploadableChunkSize(aCurrentUploadableChunkSize);
    setCurrentUploadableChunk(aCurrentUploadableChunk);

    const willBlob = aCurrentUploadableChunkSize >= maxSize || willStopUpload;
    if (!willBlob) return;

    const blob = new Blob(aCurrentUploadableChunk, { type: 'video/webm' });
    setUploadableChunks((prev) => [...prev, blob]);

    setCurrentUploadableChunk([]);
    setCurrentUploadableChunkSize(0);

    if (willStopUpload) {
      finalIndexCheck.current = uploadableChunks.length;
    }
  }, [rawChunks, willStopUpload]);

  useEffect(() => {
    if (uploadableChunks.length <= 0) return;
    if (!isLastUploadSuccess)
      throw new Error("Can't continue. Uploading got lost");

    const formData = new FormData();
    formData.append('chunk', uploadableChunks[uploadChunkIndex.current]);
    formData.append('chunkIndex', uploadChunkIndex.current);
    formData.append('uploadId', uploadId.current);
    console.log('here');

    const uploadVideoChunkWrapper = async () => {
      try {
        const response = await uploadVideoChunk(formData);
        if (response !== 200) setIsLastUploadSuccess(false);
        setCurrentUploadableChunk([]);
        setCurrentUploadableChunkSize(0);
        if (
          willStopUpload &&
          finalIndexCheck.current !== null &&
          uploadChunkIndex.current >= finalIndexCheck.current
        ) {
          console.log(
            'AM I HERE',
            uploadableChunks.length,
            uploadChunkIndex.current,
            finalIndexCheck.current
          );
          handleStopCurrentUpload();
        }
        uploadChunkIndex.current = uploadChunkIndex.current + 1;
      } catch (error) {
        if (response !== 200) setIsLastUploadSuccess(false);
        throw new Error("Can't continue. Uploading failed");
      }
    };
    uploadVideoChunkWrapper();

    // HOW TO HANDLE VERY FAST CALLS??
  }, [uploadableChunks]);

  return { rawChunks, setRawChunks, startNewUpload, stopCurrentUpload };
}
