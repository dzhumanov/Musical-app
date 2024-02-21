import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { apiURL } from "../../../constants";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9
});

interface Props {
  name: string;
  photo: string | null;
  id: string;
}

const ArtistItem: React.FC<Props> = ({ name, photo, id }) => {
  let cardImage;

  if (photo) {
    cardImage = apiURL + "/" + photo;
  }

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{ height: "100%" }}>
        <CardHeader title={name} />
        <ImageCardMedia image={cardImage} title={name} />
        <p>{id}</p>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
