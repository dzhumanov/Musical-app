import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { selectSingleAlbum } from "../albumsSlice";
import {
  deleteAlbum,
  fetchOneAlbum,
  togglePublishedAlbum,
} from "../albumsThunks";
import Tracks from "../../tracks/Tracks";
import { selectUser } from "../../users/usersSlice";

const OneAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const album = useAppSelector(selectSingleAlbum);
  const user = useAppSelector(selectUser);
  const albumId = id || "";

  useEffect(() => {
    if (id) {
      dispatch(fetchOneAlbum(id));
    }
  }, [id, dispatch]);

  const handleToggle = async () => {
    if (album) {
      await dispatch(togglePublishedAlbum(album?._id));
      if (id) {
        await dispatch(fetchOneAlbum(id));
      }
    }
  };

  const handleDelete = async () => {
    if (album) {
      await dispatch(deleteAlbum(album?._id));
    }
    navigate("/");
  };

  return (
    <>
      <Grid container direction="column">
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {album?.artist.name}
        </Typography>
        <Grid item container direction="column">
          <Typography variant="h3" sx={{ mr: "15px" }}>
            {album?.name}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {album?.date}
          </Typography>
          {user && user?._id === album?.user && (
            <>
              <Typography variant="h4" display="block">
                Status:{" "}
                {album?.isPublished ? (
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
                onClick={handleDelete}
                color="primary"
                variant="contained"
                sx={{
                  mr: "20px",
                  fontSize: "32px",
                  bgcolor: "red",
                  color: "#fff",
                  width: "200px",
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
            </>
          )}
          {user && user.role === "admin" && (
            <Grid item sx={{ mt: "20px" }}>
              <Typography variant="h4" display="block">
                Status:{" "}
                {album?.isPublished ? (
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
                {album?.isPublished ? "Unpublish" : "Publish"}
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
