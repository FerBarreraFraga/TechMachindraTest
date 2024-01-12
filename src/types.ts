export interface User {
  id: number;
  name: string;
  albums: Album[];
}

export interface Album {
  userId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface AlbumPhoto {
  id: number;
  thumbnailUrl: string;
}
