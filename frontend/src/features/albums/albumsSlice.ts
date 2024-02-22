import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { album, track } from "../../types";
import { fetchAlbums, fetchOneAlbum, fetchTracks } from "./albumsThunks";

interface AlbumsState {
  albums: album[];
  tracks: track[];
  singleAlbum: album | null;
  fetchLoading: boolean;
  fetchError: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  tracks: [],
  singleAlbum: null,
  fetchLoading: false,
  fetchError: false,
};

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
      state.fetchLoading = false;
      state.albums = albums;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });
    builder.addCase(fetchOneAlbum.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchOneAlbum.fulfilled, (state, { payload: album }) => {
      state.fetchLoading = false;
      state.singleAlbum = album;
    });
    builder.addCase(fetchOneAlbum.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });
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

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectSingleAlbum = (state: RootState) => state.albums.singleAlbum;
export const selectTracks = (state: RootState) => state.albums.tracks;
export const selectAlbumsLoading = (state: RootState) =>
  state.albums.fetchLoading;
export const selectAlbumsError = (state: RootState) => state.albums.fetchError;
