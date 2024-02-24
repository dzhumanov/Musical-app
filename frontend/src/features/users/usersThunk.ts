import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  TrackHistoryRequest,
  TrackHistoryResponse,
  User,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>("users/register", async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post("/users", registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      "/users/sessions",
      loginMutation
    );

    return response.data.user;
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
