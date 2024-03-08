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
import InterfaceInfoAdmin from "../../../components/UI/InterfaceInfo/InterfaceInfoAdmin";
import InterfaceInfoUser from "../../../components/UI/InterfaceInfo/InterfaceInfoUser";

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

  let interfaceInfo;

  if (user && user.role === "admin") {
    interfaceInfo = (
      <InterfaceInfoAdmin
        isPublished={album?.isPublished}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    );
  } else if (user && user._id === album?.user && !album?.isPublished) {
    interfaceInfo = (
      <InterfaceInfoUser
        isPublished={album.isPublished}
        onDelete={handleDelete}
      />
    );
  }

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
          {interfaceInfo}
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
