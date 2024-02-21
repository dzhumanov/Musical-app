import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { artist } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOneArtist } from "../artistsThunks";
import { useParams } from "react-router-dom";
import { selectSingleArtist } from "../artistsSlice";
import { apiURL } from "../../../constants";

const OneArtist = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const artist = useAppSelector(selectSingleArtist);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneArtist(id));
    }
  }, [id, dispatch]);

  let cardImage;

  if (artist?.photo) {
    cardImage = apiURL + "/" + artist.photo;
  }

  return (
    <>
      <Grid container direction="column">
        <Box
          component="img"
          sx={{
            display: "block",
            width: "auto",
            maxWidth: "100%",
            maxHeight: "250px",
            height: "auto",
            mx: "auto",
          }}
          src={cardImage}
        />
        <Typography variant="h3">{artist?.name}</Typography>
        <Typography variant="h6">{artist?.info}</Typography>
      </Grid>
    </>
  );
};

export default OneArtist;
