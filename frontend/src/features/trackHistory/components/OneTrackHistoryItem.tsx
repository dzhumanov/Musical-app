import { Grid, Typography } from "@mui/material";
import { artist, track } from "../../../types";
import dayjs from "dayjs";

interface Props {
  track: track;
  date: Date;
  artist: artist;
}

const OneTrackHistoryItem: React.FC<Props> = ({ track, date, artist }) => {
  const dateFormat = dayjs(date).format("DD/MM/YYYY HH:mm:ss");

  return (
    <>
      <Grid item container>
        <Typography variant="h5" sx={{ mr: "20px" }}>
          {artist.name}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>-</Typography>
        <Typography variant="h5" sx={{ ml: "20px" }}>
          {track.name}
        </Typography>
        <Typography variant="h5" sx={{ display: "block", ml: "auto" }}>
          {dateFormat}
        </Typography>
      </Grid>
    </>
  );
};

export default OneTrackHistoryItem;
