import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectArtists, selectArtistsLoading } from "./artistsSlice";
import { useEffect } from "react";
import { fetchArtist } from "./artistsThunks";
import ArtistItem from "./components/ArtistItem";
import { selectUser } from "../users/usersSlice";
import Preloader from "../../components/Preloader/Preloader";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Artists
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : artists.length > 0 ? (
        <Grid item container spacing={2}>
          {artists.map(
            (artist) =>
              (artist.isPublished ||
                (user && user.role === "admin") ||
                artist.user === user?._id) && (
                <ArtistItem
                  key={artist._id}
                  id={artist._id}
                  name={artist.name}
                  photo={artist.photo}
                />
              )
          )}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          No artists
        </Typography>
      )}
    </>
  );
};

export default Artists;
