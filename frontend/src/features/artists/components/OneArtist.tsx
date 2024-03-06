import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteArtist,
  fetchOneArtist,
  togglePublishedArtist,
} from "../artistsThunks";
import { useNavigate, useParams } from "react-router-dom";
import { selectSingleArtist } from "../artistsSlice";
import { apiURL } from "../../../constants";
import Albums from "../../albums/Albums";
import { selectUser } from "../../users/usersSlice";

const OneArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const artist = useAppSelector(selectSingleArtist);
  const user = useAppSelector(selectUser);
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

  const handleToggle = async () => {
    if (artist) {
      await dispatch(togglePublishedArtist(artist?._id));
      if (id) {
        await dispatch(fetchOneArtist(id));
      }
    }
  };

  const handleDelete = async () => {
    if (artist) {
      await dispatch(deleteArtist(artist?._id));
    }
    navigate("/");
  };

  return (
    <>
      <Grid container>
        <Grid item lg={2}>
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
        <Grid item lg={9} container direction="column" sx={{ ml: "30px" }}>
          <Grid item>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {artist?.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{artist?.info}</Typography>
          </Grid>
          {user && user.role === "admin" && (
            <Grid item sx={{ mt: "20px" }}>
              <Typography variant="h4" display="block">
                Status:{" "}
                {artist?.isPublished ? (
                  <span style={{ display: "inline-block", color: "green" }}>
                    Published
                  </span>
                ) : (
                  <span style={{ display: "inline-block", color: "red" }}>
                    Not published
                  </span>
                )}
              </Typography>
              <Button
                onClick={handleToggle}
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
                {artist?.isPublished ? "Unpublish" : "Publish"}
              </Button>
              <Button
                onClick={handleDelete}
                color="primary"
                variant="contained"
                sx={{
                  mr: "20px",
                  fontSize: "32px",
                  bgcolor: "red",
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
                Delete
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Albums artistId={artistId} />
    </>
  );
};

export default OneArtist;
