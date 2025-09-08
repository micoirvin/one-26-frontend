import { useEffect, useRef, useState } from 'react';

export default function useRecorder(streamType) {
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
    const stream = await keys[streamType].getStream();
    stream.oninactive = (e) => {
      console.log('stream', e.target, 'inactive');
    };
    return stream;
  };

  return { startMedia };
}
