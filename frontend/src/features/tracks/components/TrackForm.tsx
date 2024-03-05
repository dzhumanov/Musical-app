import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { TrackMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectArtists } from "../../artists/artistsSlice";
import { fetchArtist } from "../../artists/artistsThunks";
import { fetchAlbums } from "../../albums/albumsThunks";
import { selectAlbums } from "../../albums/albumsSlice";

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);

  const [state, setState] = useState<TrackMutation>({
    name: "",
    duration: "",
    trackNumber: 1,
    link: "",
    artist: "",
    album: "",
  });

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  useEffect(() => {
    if (state.artist) {
      dispatch(fetchAlbums(state.artist));
    }
  }, [dispatch, state.artist]);

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
            select
            id="album"
            label="Album"
            value={state.album}
            onChange={inputChangeHandler}
            name="album"
            required
          >
            <MenuItem value="" disabled>
              Please select an album
            </MenuItem>
            {albums.map((album) => (
              <MenuItem key={album?._id} value={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="duration"
            label="duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="link"
            label="Youtube link"
            value={state.link}
            onChange={inputChangeHandler}
            name="link"
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

export default TrackForm;
