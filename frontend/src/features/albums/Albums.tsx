import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAlbums, selectAlbumsLoading } from "./albumsSlice";
import { fetchAlbums } from "./albumsThunks";
import { Grid, Typography } from "@mui/material";
import AlbumItem from "./components/AlbumItem";
import { selectUser } from "../users/usersSlice";
import Preloader from "../../components/Preloader/Preloader";

interface Props {
  artistId: string;
}

const Albums: React.FC<Props> = ({ artistId }) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAlbumsLoading);

  useEffect(() => {
    dispatch(fetchAlbums(artistId));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={{ mt: "30px", fontWeight: "bold" }}>
        Albums
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : albums.length > 0 ? (
        <Grid item container spacing={2}>
          {albums.map(
            (album) =>
              (album.isPublished ||
                (user && user.role === "admin") ||
                album.user === user?._id) && (
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
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          No albums
        </Typography>
      )}
    </>
  );
};

export default Albums;
