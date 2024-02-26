import { Button, Grid, Typography } from "@mui/material";
import { track } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { sendTrackHistory } from "../../trackHistory/trackHistoryThunk";

interface Props {
  track: track;
}

const OneTrack: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handlePlayTrack = async () => {
    if (user) {
      try {
        await dispatch(
          sendTrackHistory(track._id)
        );
      } catch (error) {
        throw error;
      }
    }
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
