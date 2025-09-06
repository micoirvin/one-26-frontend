import vars from '@/vars';

export default function urlToBackend(path) {
  const { DEV_BACKEND_URL } = vars();

  return String(new URL(path, DEV_BACKEND_URL));
}
