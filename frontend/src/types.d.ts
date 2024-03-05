export interface artist {
  _id: string;
  name: string;
  info: string;
  photo: string;
}

export interface ArtistMutation {
  name: string;
  info: string;
  photo: File | null;
}

export interface album {
  _id: string;
  name: string;
  image: string;
  date: number;
  artist: {
    name: string;
    _id: string;
  };
}

export interface AlbumMutation {
  name: string;
  image: File | null;
  date: number;
  artist: string;
}

export interface track {
  _id: string;
  name: string;
  duration: string;
  trackNumber: number;
  link: string;
}

export interface TrackMutation {
  name: string;
  duration: string;
  trackNumber: number;
  link: string;
  artist: string;
  album: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface TrackHistoryRequest {
  token: string;
  track: string;
}

export interface TrackHistoryResponse {
  user: string;
  track: string;
  datetime: Date;
}

export interface trackHistory {
  artist: artist;
  track: track;
  datetime: Date;
}
