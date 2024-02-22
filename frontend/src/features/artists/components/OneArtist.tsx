import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOneArtist } from "../artistsThunks";
import { useParams } from "react-router-dom";
import { selectSingleArtist } from "../artistsSlice";
import { apiURL } from "../../../constants";
import Albums from "../../albums/Albums";

const OneArtist = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const artist = useAppSelector(selectSingleArtist);
  const artistId = id || "";

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
      <Grid container>
        <Grid item>
          <Box
            component="img"
            sx={{
              display: "block",
              width: "auto",
              maxWidth: "100%",
              maxHeight: "250px",
              height: "auto",
            }}
            src={cardImage}
          />
        </Grid>
        <Grid item sx={{ ml: "30px" }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            {artist?.name}
          </Typography>
          <Typography variant="h4">{artist?.info}</Typography>
        </Grid>
      </Grid>
      <Albums artistId={artistId} />
    </>
  );
};

export default OneArtist;
