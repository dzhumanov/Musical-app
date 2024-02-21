import { createAsyncThunk } from "@reduxjs/toolkit";
import { artist } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchArtist = createAsyncThunk<artist[]>(
  "artists/fetchAll",
  async () => {
    const response = await axiosApi.get<artist[]>("/artists");
    return response.data;
  }
);
