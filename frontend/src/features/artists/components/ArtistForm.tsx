import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { ArtistMutation } from "../../../types";
import FileInput from "../../../components/FileInput/FileInput";

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<ArtistMutation>({
    name: "",
    info: "",
    photo: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="info"
            label="Info"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Photo"
            name="photo"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mr: "20px",
              fontSize: "32px",
              bgcolor: "#1976D2",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fff",
                color: "#000",
              },
              "&:active": {
                bgcolor: "#000",
                color: "#fff",
              },
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;
