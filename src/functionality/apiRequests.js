import urlToBackend from '../utils/urlToBackend';

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    fetch(urlToBackend('api/google/user-info'), {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) return resolve(null);
        return response.json();
      })
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        console.error('Error fetching user info from Google', error);
        return reject(error);
      });
  });
};

export const getNewUploadId = () => {
  return new Promise((resolve, reject) => {
    fetch(urlToBackend('api/generate-id'), {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) return resolve(null);
        return response.json();
      })
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        console.error('Error fetching user info from Google', error);
        return reject(error);
      });
  });
};

export const uploadVideoChunk = async (formData) => {
  try {
    const response = await fetch(urlToBackend('/api/upload/video-chunk'), {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (response.ok) return 'OK';
    else return onsole.error('Error uploading chunk');
  } catch (error) {
    return console.error('Error uploading chunk');
  }
};

export const finalizeVideoUpload = async (uploadId) => {
  try {
    const response = await fetch(urlToBackend('/api/upload/video-finalize'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ uploadId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return console.error('Error finalizing upload');
  }
};
