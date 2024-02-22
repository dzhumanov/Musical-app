import { createAsyncThunk } from "@reduxjs/toolkit";
import { album, track } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk<album[], string>(
  "albums/fetchAll",
  async (artistId: string) => {
    const response = await axiosApi.get<album[]>(`/albums?artist=${artistId}`);
    return response.data;
  }
);

export const fetchOneAlbum = createAsyncThunk<album, string>(
  "albums/fetchOne",
  async (albumId: string) => {
    const response = await axiosApi.get<album>(`/albums/${albumId}`);
    return response.data;
  }
);

export const fetchTracks = createAsyncThunk<track[], string>(
  "tracks/fetchAll",
  async (albumId: string) => {
    const response = await axiosApi.get<track[]>(`/tracks/?album=${albumId}`);
    return response.data;
  }
);
