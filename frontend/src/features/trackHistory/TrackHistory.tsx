import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchHistory } from "./trackHistoryThunk";
import { selectUser } from "../users/usersSlice";
import { selectHistory } from "./trackHistorySlice";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useAppSelector(selectHistory);

  useEffect(() => {
    if (user) {
      dispatch(fetchHistory());
      console.log(history);
    }
  }, [dispatch]);

  return <></>;
};

export default TrackHistory;
