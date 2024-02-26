import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  TrackHistoryRequest,
  TrackHistoryResponse,
  trackHistory,
} from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const fetchHistory = createAsyncThunk<
  trackHistory[],
  void,
  { rejectValue: GlobalError }
>("trackHistory/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = useSelector((state: RootState) => state.users.user?.token);

    if (!token) {
      throw new Error("No token!");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosApi.get<trackHistory[]>(
      "/trackHistory",
      config
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const sendTrackHistory = createAsyncThunk<
  TrackHistoryResponse,
  TrackHistoryRequest,
  { rejectValue: GlobalError }
>(
  "trackHistory/sendTrackHistory",
  async ({ token, trackId }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<TrackHistoryResponse>(
        "/trackHistory",
        { trackId },
        {
          headers: {
            Authentication: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);
