/**
 * Converts a relative image path to a full backend URL
 * @param path - Relative path like "/assets/image.jpg" or "image.jpg"
 * @returns Full URL like "http://localhost:5000/assets/image.jpg"
 */
export const getImageUrl = (path: string | undefined): string => {
    if (!path) return '/placeholder.svg';

    // If it's already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // If it's a placeholder, return as is
    if (path === '/placeholder.svg' || path === 'placeholder.svg') {
        return '/placeholder.svg';
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseUrl = apiUrl.replace('/api', '');

    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    // If path doesn't start with 'assets/', prepend it
    const finalPath = cleanPath.startsWith('assets/') ? cleanPath : `assets/${cleanPath}`;

    return `${baseUrl}/${finalPath}`;
};
