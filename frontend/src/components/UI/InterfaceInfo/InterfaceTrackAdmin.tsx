import { Button, Grid, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

const InterfaceTrackAdmin: React.FC<Props> = ({
  isPublished,
  onDelete,
  onToggle,
}) => {
  return (
    <Grid item container xs={4} alignItems="center" justifyContent="flex-end">
      <Typography
        variant="h5"
        display="block"
        sx={{
          color: isPublished ? "green" : "red",
          fontSize: "16px",
          mr: 1,
        }}
      >
        {isPublished ? "Published" : "Not published"}
      </Typography>
      <Button
        color="primary"
        onClick={onToggle}
        variant="contained"
        sx={{ mr: 1 }}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button
        onClick={onDelete}
        color="primary"
        variant="contained"
        sx={{ bgcolor: "red", mr: 1 }}
      >
        Delete
      </Button>
    </Grid>
  );
};

export default InterfaceTrackAdmin;
