import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { apiURL } from "../../../constants";
import { selectSingleAlbum } from "../albumsSlice";
import { fetchOneAlbum } from "../albumsThunks";
import Tracks from "./Tracks";

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
        <Typography variant="h3">{album?.artist.name}</Typography>
        <Typography variant="h3">{album?.name}</Typography>
        <Typography variant="h6">Year: {album?.date}</Typography>
      </Grid>
      <Grid container direction="column">
        <Tracks albumId={albumId} />
      </Grid>
    </>
  );
};

export default OneAlbum;
