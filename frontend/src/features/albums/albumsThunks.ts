import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlbumMutation, album } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

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

export const createAlbum = createAsyncThunk<
  void,
  AlbumMutation,
  { state: RootState }
>("albums/create", async (AlbumMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      Object.entries(AlbumMutation).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      await axiosApi.post("/albums", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
