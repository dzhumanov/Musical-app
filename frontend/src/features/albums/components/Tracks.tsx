import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectTracks } from "../albumsSlice";
import { useEffect } from "react";
import { fetchTracks } from "../albumsThunks";

interface Props {
  albumId: string;
}

const Tracks: React.FC<Props> = ({ albumId }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch]);

  return (
    <>
      <Grid container>
        {tracks.map((track) => (
            <Grid item>
                <Typography variant="h5">{track.trackNumber}</Typography>
                <Typography variant="h5">{track.name}</Typography>
                <Typography variant="h5">{track.duration}</Typography>
            </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Tracks;
