import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchTracks } from "./tracksThunk";
import OneTrack from "./OneTrack";
import { selectTracks } from "./tracksSlice";
import { selectUser } from "../users/usersSlice";

interface Props {
  albumId: string;
}

const Tracks: React.FC<Props> = ({ albumId }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column">
        {tracks.map(
          (track) =>
            (track.isPublished || (user && user.role === "admin")) && (
              <OneTrack track={track} key={track.name} />
            )
        )}
      </Grid>
    </>
  );
};

export default Tracks;
