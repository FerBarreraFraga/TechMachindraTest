const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

export const fetchAlbums = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/albums?userId=${userId}`);
  return response.json();
};

export const fetchAlbumPhotos = async (albumId: number) => {
  const response = await fetch(`${BASE_URL}/photos?albumId=${albumId}`);
  const json = await response.clone().json();
  return json;
};

export const fetchAllPhotos = async () => {
  const response = await fetch(`${BASE_URL}/photos`);
  const json = await response.clone().json();
  return json;
};
