import { createAsyncThunk } from "@reduxjs/toolkit";
import { TrackMutation, track } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchTracks = createAsyncThunk<track[], string>(
  "tracks/fetchAll",
  async (albumId: string) => {
    const response = await axiosApi.get<track[]>(`/tracks/?album=${albumId}`);
    return response.data;
  }
);

export const createTrack = createAsyncThunk<
  void,
  TrackMutation,
  { state: RootState }
>("tracks/create", async (trackMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.post("/tracks", trackMutation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
});

export const togglePublishedTrack = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("tracks/toggle", async (trackId, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.patch(`/tracks/${trackId}/togglePublished`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
});

export const deleteTrack = createAsyncThunk<void, string, { state: RootState }>(
  "tracks/delete",
  async (trackId: string, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.users.user?.token;

      if (token) {
        await axiosApi.delete(`/tracks/${trackId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
);
