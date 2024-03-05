import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArtistMutation, artist } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchArtist = createAsyncThunk<artist[]>(
  "artists/fetchAll",
  async () => {
    const response = await axiosApi.get<artist[]>("/artists");
    return response.data;
  }
);

export const fetchOneArtist = createAsyncThunk<artist, string>(
  "artists/fetchOne",
  async (artistId: string) => {
    const response = await axiosApi.get<artist>(`/artists/${artistId}`);
    return response.data;
  }
);

export const createArtist = createAsyncThunk<
  void,
  ArtistMutation,
  { state: RootState }
>("artists/create", async (ArtistMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      Object.entries(ArtistMutation).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      await axiosApi.post("/artists", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});