import { Button, Grid, Typography } from "@mui/material";
import { track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { sendTrackHistory } from "../trackHistory/trackHistoryThunk";
import { deleteTrack, fetchTracks, togglePublishedTrack } from "./tracksThunk";
import InterfaceTrackAdmin from "../../components/UI/InterfaceInfo/InterfaceTrackAdmin";
import InterfaceTrackUser from "../../components/UI/InterfaceInfo/InterfaceTrackUser";

interface Props {
  track: track;
}

const OneTrack: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handlePlayTrack = async () => {
    if (user) {
      try {
        if (track.link) {
          playYouTubeTrack(track.link);
        }

        await dispatch(sendTrackHistory(track._id));
      } catch (error) {
        throw error;
      }
    }
  };

  const handleToggle = async () => {
    if (track) {
      await dispatch(togglePublishedTrack(track?._id));
      if (track.album) {
        await dispatch(fetchTracks(track.album._id));
      }
    }
  };

  const handleDelete = async () => {
    if (track) {
      await dispatch(deleteTrack(track?._id));
    }
    if (track.album) {
      await dispatch(fetchTracks(track.album._id));
    }
  };

  let interfaceInfo;

  if (user && user.role === "admin") {
    interfaceInfo = (
      <InterfaceTrackAdmin
        isPublished={track?.isPublished}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    );
  } else if (user && user._id === track?.user && !track?.isPublished) {
    interfaceInfo = (
      <InterfaceTrackUser
        isPublished={track.isPublished}
        onDelete={handleDelete}
      />
    );
  }

  const playYouTubeTrack = (youtubeLink: string) => {
    window.open(youtubeLink, "YouTube Player", "width=1000,height=1000");
  };

  return (
    <Grid container alignItems="center" sx={{ mb: "5px" }}>
      <Grid item container justifyContent="center" xs={1}>
        <Typography variant="h5">{track.trackNumber}</Typography>
        {user && (
          <Button onClick={handlePlayTrack}>
            <PlayArrowIcon />
          </Button>
        )}
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h5">{track.name}</Typography>
      </Grid>
      {interfaceInfo}
      <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
        <Typography variant="h5">{track.duration}</Typography>
      </Grid>
    </Grid>
  );
};

export default OneTrack;
