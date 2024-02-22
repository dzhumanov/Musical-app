export interface artist {
  _id: string | null;
  name: string;
  info: string;
  photo: string;
}

export interface album {
  _id: string | null;
  name: string;
  image: string;
  date: number;
  artist: {
    name: string;
    _id: string;
  };
}

export interface track {
  name: string;
  duration: string;
  trackNumber: number;
}
