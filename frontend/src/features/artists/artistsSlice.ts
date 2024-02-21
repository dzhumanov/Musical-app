import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { artist } from "../../types";
import { fetchArtist } from "./artistsThunks";

interface ArtistsState {
  artists: artist[];
  fetchLoading: boolean;
  fetchError: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: false,
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchArtist.fulfilled, (state, { payload: artists }) => {
      state.fetchLoading = false;
      state.artists = artists;
    });
    builder.addCase(fetchArtist.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectArtistsError = (state: RootState) =>
  state.artists.fetchError;
