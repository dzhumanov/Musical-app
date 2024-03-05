import { createAsyncThunk } from "@reduxjs/toolkit";
import { album } from "../../types";
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
