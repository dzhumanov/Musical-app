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
}