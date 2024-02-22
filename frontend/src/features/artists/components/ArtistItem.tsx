import React from "react";
import { Button, Card, CardHeader, CardMedia, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { apiURL } from "../../../constants";

interface Props {
  name: string;
  photo: string | null;
  id: string | null;
}

const ArtistItem: React.FC<Props> = ({ name, photo, id }) => {
  let cardImage;

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
        <CardHeader title={name} />
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
            to={`/artists/${id}`}
          >
            Show artist
          </NavLink>
        </Button>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
