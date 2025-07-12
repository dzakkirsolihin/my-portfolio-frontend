export const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/storage/')) {
    return `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}${url}`;
  }
  return url;
}; 