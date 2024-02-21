import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectArtists,
  selectArtistsError,
  selectArtistsLoading,
} from "./artistsSlice";
import { useEffect } from "react";
import { fetchArtist } from "./artistsThunks";
import ArtistItem from "./components/ArtistItem";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);
  const error = useAppSelector(selectArtistsError);

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3">Artists</Typography>
      <Grid item container spacing={2}>
        {artists.map((artist) => (
          <ArtistItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            photo={artist.photo}
          />
        ))}
      </Grid>
    </>
  );
};

export default Artists;
