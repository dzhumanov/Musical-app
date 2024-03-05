import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NavLink, useParams } from "react-router-dom";
import { apiURL } from "../../../constants";
import { selectSingleAlbum } from "../albumsSlice";
import { fetchOneAlbum } from "../albumsThunks";
import Tracks from "../../tracks/Tracks";

const OneAlbum = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const album = useAppSelector(selectSingleAlbum);
  const albumId = id || "";

  useEffect(() => {
    if (id) {
      dispatch(fetchOneAlbum(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <Grid container direction="column">
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {album?.artist.name}
        </Typography>
        <Grid item container alignItems="center">
          <Typography variant="h3" sx={{ mr: "15px" }}>
            {album?.name}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {album?.date}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Tracks albumId={albumId} />
      </Grid>
      <NavLink
        style={{
          textDecoration: "none",
          color: "#fff",
          width: "100%",
        }}
        to={`/`}
      >
        <Button variant="contained" sx={{ width: "100%" }}>
          Back to home
        </Button>
      </NavLink>
    </>
  );
};

export default OneAlbum;
