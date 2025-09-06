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
