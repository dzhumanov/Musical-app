import { createSlice } from "@reduxjs/toolkit";
import { trackHistory } from "../../types";
import { RootState } from "../../app/store";
import { fetchHistory } from "./trackHistoryThunk";

interface HistoryState {
  history: trackHistory[];
  trackHistoryLoading: boolean;
}

const initialState: HistoryState = {
  history: [],
  trackHistoryLoading: false,
};

export const trackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.trackHistoryLoading = true;
    });
    builder.addCase(
      fetchHistory.fulfilled,
      (state, { payload: trackHistories }) => {
        state.trackHistoryLoading = false;
        state.history = trackHistories;
      }
    );
    builder.addCase(fetchHistory.rejected, (state) => {
      state.trackHistoryLoading = false;
    });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectHistory = (state: RootState) => state.trackHistory.history;
export const selectHistoryLoading = (state: RootState) =>
  state.trackHistory.trackHistoryLoading;
