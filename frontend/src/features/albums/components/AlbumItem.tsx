import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { apiURL } from "../../../constants";

interface Props {
  id: string | null;
  name: string;
  image: string | null;
  date: number;
}

const AlbumItem: React.FC<Props> = ({ name, image, date, id }) => {
  let cardImage;

  if (image) {
    cardImage = apiURL + "/" + image;
  }

  return (
    <Grid item sm md={4} lg={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardHeader title={name} />
        <Typography variant="h4">Year: {date}</Typography>
        <CardMedia
          component="img"
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "500px",
            mx: "auto",
          }}
          image={cardImage}
        />
        <Button variant="contained" sx={{ mr: "20px" }}>
          <NavLink
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
            to={`/albums/${id}`}
          >
            Show album
          </NavLink>
        </Button>
      </Card>
    </Grid>
  );
};

export default AlbumItem;
