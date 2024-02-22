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
import imageNotAvailable from "../../../assets/images/image_not_available.png";

interface Props {
  id: string | null;
  name: string;
  image: string | null;
  date: number;
}

const AlbumItem: React.FC<Props> = ({ name, image, date, id }) => {
  let cardImage = imageNotAvailable;

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
        <CardHeader
          sx={{ paddingBottom: "0" }}
          title={
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              {name}
            </Typography>
          }
        />
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {date}
        </Typography>
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
        <NavLink
          style={{
            textDecoration: "none",
            color: "#fff",
            width: "100%",
          }}
          to={`/albums/${id}`}
        >
          <Button variant="contained" sx={{ width: "100%" }}>
            Show album
          </Button>
        </NavLink>
      </Card>
    </Grid>
  );
};

export default AlbumItem;
