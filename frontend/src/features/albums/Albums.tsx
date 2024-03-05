import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAlbums,
  selectAlbumsError,
  selectAlbumsLoading,
} from "./albumsSlice";
import { fetchAlbums } from "./albumsThunks";
import { Grid, Typography } from "@mui/material";
import AlbumItem from "./components/AlbumItem";
import { selectUser } from "../users/usersSlice";

interface Props {
  artistId: string;
}

const Albums: React.FC<Props> = ({ artistId }) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAlbumsLoading);
  const error = useAppSelector(selectAlbumsError);

  useEffect(() => {
    dispatch(fetchAlbums(artistId));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={{ mt: "30px", fontWeight: "bold" }}>
        Albums
      </Typography>
      <Grid item container spacing={2}>
        {albums.map(
          (album) =>
            (album.isPublished || (user && user.role === "admin")) && (
              <AlbumItem
                key={album._id}
                id={album._id}
                name={album.name}
                image={album.image}
                date={album.date}
              />
            )
        )}
      </Grid>
    </>
  );
};

export default Albums;
