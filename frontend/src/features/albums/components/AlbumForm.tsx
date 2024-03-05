import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { AlbumMutation } from "../../../types";
import FileInput from "../../../components/FileInput/FileInput";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectArtists } from "../../artists/artistsSlice";
import { fetchArtist } from "../../artists/artistsThunks";

interface Props {
  onSubmit: (mutation: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  const [state, setState] = useState<AlbumMutation>({
    name: "",
    image: null,
    date: 2024,
    artist: "",
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            select
            id="artist"
            label="Artist"
            value={state.artist}
            onChange={inputChangeHandler}
            name="artist"
            required
          >
            <MenuItem value="" disabled>
              Please select an artist
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist?._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            type="number"
            id="date"
            label="Date"
            value={state.date}
            onChange={inputChangeHandler}
            name="date"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mr: "20px",
              fontSize: "32px",
              bgcolor: "#1976D2",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fff",
                color: "#000",
              },
              "&:active": {
                bgcolor: "#000",
                color: "#fff",
              },
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;
