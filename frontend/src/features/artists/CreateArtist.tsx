import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Container, Typography } from "@mui/material";
import { selectUser } from "../users/usersSlice";
import { useEffect } from "react";
import { ArtistMutation } from "../../types";
import { createArtist } from "./artistsThunks";
import ArtistForm from "./components/ArtistForm";

const CreateNewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (ArtistMutation: ArtistMutation) => {
    try {
      await dispatch(createArtist(ArtistMutation)).unwrap();
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
      <Typography variant="h4">Post new artist</Typography>
      <ArtistForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default CreateNewItem;
