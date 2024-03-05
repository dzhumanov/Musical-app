import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Container, Typography } from "@mui/material";
import { selectUser } from "../users/usersSlice";
import { useEffect } from "react";
import { AlbumMutation } from "../../types";
import { createAlbum } from "./albumsThunks";
import AlbumForm from "./components/AlbumForm";

const CreateAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (AlbumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(AlbumMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container
      sx={{
        bgcolor: "#fff",
        pt: "30px",
        pb: "30px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4">Post new album</Typography>
      <AlbumForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default CreateAlbum;
