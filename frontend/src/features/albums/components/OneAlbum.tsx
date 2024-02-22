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

  let cardImage;

  if (album?.image) {
    cardImage = apiURL + "/" + album.image;
  }

  return (
    <>
      <Grid container direction="column">
        <Typography variant="h3">Artist name</Typography>
        <Typography variant="h3">{album?.name}</Typography>
        <Typography variant="h6">{album?.date}</Typography>
      </Grid>
      <Tracks albumId={albumId} />
    </>
  );
};

export default OneAlbum;
