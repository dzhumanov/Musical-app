import { createSlice } from "@reduxjs/toolkit";
import { track } from "../../types";
import { fetchTracks } from "./tracksThunk";
import { RootState } from "../../app/store";

interface TracksState {
  tracks: track[];
  fetchLoading: boolean;
  fetchError: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  fetchError: false,
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
      state.fetchLoading = false;
      state.tracks = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchLoading;
export const selectTracksError = (state: RootState) => state.tracks.fetchError;
