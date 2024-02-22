import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectArtists } from "./artistsSlice";
import { useEffect } from "react";
import { fetchArtist } from "./artistsThunks";
import ArtistItem from "./components/ArtistItem";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Artists
      </Typography>
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
