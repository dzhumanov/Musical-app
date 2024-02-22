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
  name: string;
  photo: string | null;
  id: string | null;
}

const ArtistItem: React.FC<Props> = ({ name, photo, id }) => {
  let cardImage = imageNotAvailable;

  if (photo) {
    cardImage = apiURL + "/" + photo;
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
          title={
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {name}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "360px",
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
          to={`/artists/${id}`}
        >
          <Button variant="contained" sx={{ width: "100%" }}>
            Show artist
          </Button>
        </NavLink>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
