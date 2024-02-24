import { Button, Grid, Typography } from "@mui/material";
import { track } from "../../../types";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { sendTrackHistory } from "../../users/usersThunk";

interface Props {
  track: track;
}

const OneTrack: React.FC<Props> = ({ track }) => {
  const user = useAppSelector(selectUser);

  const handlePlayTrack = () => {
    if (user) {
      try {
        sendTrackHistory({ token: user.token, trackId: track._id });
      } catch (error) {}
    }
  };

  return (
    <>
      <Grid item container key={track.name}>
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
