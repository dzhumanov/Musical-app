import { Button, Grid, Typography } from "@mui/material";
import { track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { sendTrackHistory } from "../trackHistory/trackHistoryThunk";

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

  const playYouTubeTrack = (youtubeLink: string) => {
    window.open(youtubeLink, "YouTube Player", "width=1000,height=1000");
  };

  return (
    <>
      <Grid item container>
        <Typography variant="h5" sx={{ mr: "20px" }}>
          {track.trackNumber}
        </Typography>
        {user && (
          <Button onClick={handlePlayTrack}>
            <PlayArrowIcon />
          </Button>
        )}
        <Typography variant="h5">{track.name}</Typography>
        <Typography variant="h5" sx={{ display: "block", ml: "auto" }}>
          {track.duration}
        </Typography>
      </Grid>
    </>
  );
};

export default OneTrack;
