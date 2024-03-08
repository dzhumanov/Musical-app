import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchTracks } from "./tracksThunk";
import OneTrack from "./OneTrack";
import { selectTracks, selectTracksLoading } from "./tracksSlice";
import { selectUser } from "../users/usersSlice";
import Preloader from "../../components/Preloader/Preloader";

interface Props {
  albumId: string;
}

const Tracks: React.FC<Props> = ({ albumId }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column">
        {loading ? (
          <Preloader loading={loading} />
        ) : tracks.length > 0 ? (
          tracks.map(
            (track) =>
              (track.isPublished ||
                (user && user.role === "admin") ||
                track.user === user?._id) && (
                <OneTrack track={track} key={track.name} />
              )
          )
        ) : (
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            No tracks
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Tracks;
