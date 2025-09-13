import { useEffect, useRef, useState } from 'react';
import {
  finalizeVideoUpload,
  getNewUploadId,
  uploadVideoChunk,
} from '../functionality/apiRequests';

import useUser from '../hooks/useUser';
import useUploading from './useUploading';

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

  const [willStopChunks, setWillStopChunks] = useState(false);
  const [willUpload, setWillUpload] = useState(false);

  const uploadFileName = useRef('');
  const fileLink = useRef('');

  const { appDriveRootFolder } = useUser();
  const {
    isUploading,
    setIsUploading,
    setUploadSuccess,
    setHasTriedUpload,
    isAwaitingUploadReset,
  } = useUploading();

  const startNewChunksUpload = async () => {
    uploadId.current = (await getNewUploadId())?.id;
    console.log('upload id:', uploadId.current);
    return uploadId.current;
  };

  const stopChunksUpload = () => {
    return setWillStopChunks(true);
  };

  const uploadPostCleanup = () => {
    setRawChunks([]);
    setUploadableChunks([]);
    setCurrentUploadableChunk([]);
    setCurrentUploadableChunkSize(0);
    uploadChunkIndex.current = 0;
    rawChunkIndex.current = 0;
    setWillStopChunks(false);
    finalIndexCheck.current = null;
    uploadId.current = null;
    setWillUpload(false);
    setIsUploading(false);
  };

  const handleUpload = async () => {
    setIsUploading(true);

    const jsonData = await finalizeVideoUpload(
      uploadId.current,
      uploadFileName.current,
      appDriveRootFolder.current
    );
    setHasTriedUpload(true);
    if (!jsonData) return setIsUploading(false);
    console.log(jsonData);
    fileLink.current = jsonData.webViewLink;
    uploadPostCleanup();
    setUploadSuccess(true);
  };

  const triggerUpload = (fileName) => {
    setWillUpload(true);
    uploadFileName.current = fileName;
  };

  useEffect(() => {
    if (isAwaitingUploadReset) return;
    fileLink.current = '';
  }, [isAwaitingUploadReset]);

  useEffect(() => {
    console.log('uploading', isUploading);
  }, [isUploading]);

  useEffect(() => {
    if (!willUpload) return;

    const wrap = () => {
      console.log(
        'Finalize Upload',
        uploadableChunks.length,
        uploadChunkIndex.current,
        finalIndexCheck.current,
        willStopChunks,
        willUpload
      );
      if (
        willStopChunks &&
        finalIndexCheck.current !== null &&
        uploadChunkIndex.current >= finalIndexCheck.current
      ) {
        handleUpload();
      }
    };

    wrap();
  }, [willUpload]);

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

    rawChunkIndex.current = rawChunkIndex.current + 1;

    setCurrentUploadableChunkSize(aCurrentUploadableChunkSize);
    setCurrentUploadableChunk(aCurrentUploadableChunk);

    const willBlob = aCurrentUploadableChunkSize >= maxSize || willStopChunks;
    if (!willBlob) return;

    const blob = new Blob(aCurrentUploadableChunk, { type: 'video/webm' });
    setUploadableChunks((prev) => [...prev, blob]);

    setCurrentUploadableChunk([]);
    setCurrentUploadableChunkSize(0);

    if (willStopChunks) finalIndexCheck.current = uploadableChunks.length;
  }, [rawChunks, willStopChunks]);

  useEffect(() => {
    if (uploadableChunks.length <= 0) return;
    if (!isLastUploadSuccess)
      throw new Error("Can't continue. Uploading got lost");

    const formData = new FormData();
    formData.append('chunk', uploadableChunks[uploadChunkIndex.current]);
    formData.append('chunkIndex', uploadChunkIndex.current);
    formData.append('uploadId', uploadId.current);

    const uploadVideoChunkWrapper = async () => {
      try {
        const response = await uploadVideoChunk(formData);
        if (response !== 200) return setIsLastUploadSuccess(false);

        console.log(
          'chunk with size:',
          uploadableChunks[uploadChunkIndex.current].size,
          'uploaded to server temp'
        );

        if (
          willStopChunks &&
          finalIndexCheck.current !== null &&
          uploadChunkIndex.current >= finalIndexCheck.current
        ) {
          console.log(
            'last chunk received',
            uploadableChunks.length,
            uploadChunkIndex.current,
            finalIndexCheck.current
          );
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

  return {
    rawChunks,
    setRawChunks,
    startNewChunksUpload,
    stopChunksUpload,
    triggerUpload,
    uploadPostCleanup,
    fileLink,
    uploadId,
  };
}
