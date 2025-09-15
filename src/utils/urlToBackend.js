import vars from '@/vars';

export default function urlToBackend(path) {
  const { ENVIRONMENT, DEV_BACKEND_URL, PROD_BACKEND_URL } = vars();

  if (ENVIRONMENT === 'DEV') {
    return String(new URL(path, DEV_BACKEND_URL));
  } else {
    return String(new URL(path, PROD_BACKEND_URL));
  }
}
