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

export const getNewUploadId = async () => {
  try {
    const response = await fetch(urlToBackend('api/generate-id'), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) return await response.json();
    else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadVideoChunk = async (formData) => {
  try {
    const response = await fetch(urlToBackend('/api/upload/video-chunk'), {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (response.ok) return 200;
    else throw new Error('');
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const finalizeVideoUpload = async (
  uploadId,
  name,
  appDriveRootFolder
) => {
  try {
    const response = await fetch(urlToBackend('/api/upload/video-finalize'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ uploadId, name, appDriveRootFolder }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) return await response.json();
    else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeTempUploads = async (fileId) => {
  try {
    const response = await fetch(
      urlToBackend('/api/upload/remove-temp-uploads'),
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ fileId }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
