/** Backend origin for static uploads (axios uses /api base path). */
export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000';

export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}
