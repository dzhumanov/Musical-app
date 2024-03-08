import { Box,  Grid, Typography } from "@mui/material";
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
import InterfaceInfoAdmin from "../../../components/UI/InterfaceInfo/InterfaceInfoAdmin";
import InterfaceInfoUser from "../../../components/UI/InterfaceInfo/InterfaceInfoUser";

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

  let interfaceInfo;

  if (user && user.role === "admin") {
    interfaceInfo = (
      <InterfaceInfoAdmin
        isPublished={artist?.isPublished}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    );
  } else if (user && user._id === artist?.user && !artist?.isPublished) {
    interfaceInfo = (
      <InterfaceInfoUser
        isPublished={artist.isPublished}
        onDelete={handleDelete}
      />
    );
  }

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
          {interfaceInfo}
        </Grid>
      </Grid>
      <Albums artistId={artistId} />
    </>
  );
};

export default OneArtist;
