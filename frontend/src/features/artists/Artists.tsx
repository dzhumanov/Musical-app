import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectArtists } from "./artistsSlice";
import { useEffect } from "react";
import { fetchArtist } from "./artistsThunks";
import ArtistItem from "./components/ArtistItem";
import { selectUser } from "../users/usersSlice";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Artists
      </Typography>
      <Grid item container spacing={2}>
        {artists.map(
          (artist) =>
          (artist.isPublished || (user && user.role === "admin")) && (
              <ArtistItem
                key={artist._id}
                id={artist._id}
                name={artist.name}
                photo={artist.photo}
              />
            )
        )}
      </Grid>
    </>
  );
};

export default Artists;
