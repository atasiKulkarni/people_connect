// Define your base URLs from environment variables
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const S3_BASE_URL = import.meta.env.VITE_S3_BUCKET_URL; // Add this to your .env

export const getImageFromUrl = (endPoint: string, isNativeS3: boolean = false) => {
  // Logic to choose which base URL to use
  const imageAssetBaseUrl = isNativeS3 ? S3_BASE_URL : API_BASE_URL;
  
  // Ensure there's a slash between the base and endpoint
  const url = `${imageAssetBaseUrl.replace(/\/$/, '')}/${endPoint.replace(/^\//, '')}`;
  return url;
};
