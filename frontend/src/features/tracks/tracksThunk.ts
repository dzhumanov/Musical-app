import { createAsyncThunk } from "@reduxjs/toolkit";
import { track } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchTracks = createAsyncThunk<track[], string>(
    "tracks/fetchAll",
    async (albumId: string) => {
      const response = await axiosApi.get<track[]>(`/tracks/?album=${albumId}`);
      return response.data;
    }
  );
  