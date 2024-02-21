import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { artist } from "../../types";
import { fetchArtist, fetchOneArtist } from "./artistsThunks";

interface ArtistsState {
  artists: artist[];
  singleArtist: artist | null;
  fetchLoading: boolean;
  fetchError: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  singleArtist: null,
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
    builder.addCase(fetchOneArtist.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchOneArtist.fulfilled, (state, { payload: artist }) => {
      state.fetchLoading = false;
      state.singleArtist = artist;
    });
    builder.addCase(fetchOneArtist.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectSingleArtist = (state: RootState) =>
  state.artists.singleArtist;
export const selectArtistsLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectArtistsError = (state: RootState) =>
  state.artists.fetchError;
