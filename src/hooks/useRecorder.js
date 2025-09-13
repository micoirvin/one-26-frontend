import { useState } from 'react';

export default function useRecorder(streamType) {
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState(null);
  const keys = {
    camera: {
      getStream: async () =>
        await navigator.mediaDevices.getUserMedia({
          video: true,
        }),
    },

    microphone: {
      getStream: async () =>
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        }),
    },

    screen: {
      getStream: async () =>
        await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: 'screen' },
        }),
    },
  };

  const startMedia = async () => {
    const aStream = await keys[streamType].getStream();
    aStream.addEventListener('inactive', () => {
      setIsActive(false);
    });

    return aStream;
  };

  return { startMedia, isActive, setIsActive };
}
