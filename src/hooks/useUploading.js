import { useContext, useEffect } from 'react';
import { UploadingContext } from '../contexts/UploadingContext';

export default function useUploading() {
  const uploadingContext = useContext(UploadingContext);
  return uploadingContext;
}
