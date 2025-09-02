import { useEffect } from 'react';
import GalleryHeader from './GalleryHeader';

export default function Gallery() {
  useEffect(() => {
    const fetchWrapper = async () => {
      const deets = await fetch(
        'https://www.googleapis.com/drive/v3/files/1xAk0uTSBnhCfwnyrXVxqLM09p2OLtxx9',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('userJwt'),
          },
        }
      );
    };
    fetchWrapper();
  }, []);
  return (
    <section>
      <GalleryHeader />
      <div className="grid"></div>
    </section>
  );
}
