import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchHistory } from "./trackHistoryThunk";
import { selectUser } from "../users/usersSlice";
import { selectHistory } from "./trackHistorySlice";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import OneTrackHistoryItem from "./components/OneTrackHistoryItem";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useAppSelector(selectHistory);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(fetchHistory());
    console.log(history);
  }, [dispatch]);

  return (
    <Grid container>
      {history.map((historyItem) => (
        <OneTrackHistoryItem
          key={Math.random()}
          track={historyItem.track}
          artist={historyItem.artist}
          date={historyItem.datetime}
        />
      ))}
    </Grid>
  );
};

export default TrackHistory;
