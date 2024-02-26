import { createSlice } from "@reduxjs/toolkit";
import { GlobalError, trackHistory } from "../../types";
import { RootState } from "../../app/store";
import { fetchHistory } from "./trackHistoryThunk";

interface HistoryState {
  history: trackHistory[];
  trackHistoryLoading: boolean;
  trackHistoryError: GlobalError | null;
}

const initialState: HistoryState = {
  history: [],
  trackHistoryLoading: false,
  trackHistoryError: null,
};

export const trackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.trackHistoryLoading = true;
      state.trackHistoryError = null;
    });
    builder.addCase(
      fetchHistory.fulfilled,
      (state, { payload: trackHistories }) => {
        state.trackHistoryLoading = false;
        state.history = trackHistories;
      }
    );
    builder.addCase(fetchHistory.rejected, (state, { payload: error }) => {
      state.trackHistoryLoading = false;
      state.trackHistoryError = error || null;
    });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectHistory = (state: RootState) => state.trackHistory.history;
export const selectHistoryLoading = (state: RootState) =>
  state.trackHistory.trackHistoryLoading;
export const selectHistoryError = (state: RootState) =>
  state.trackHistory.trackHistoryError;
