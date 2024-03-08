import { Button, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
}

const InterfaceInfoUser: React.FC<Props> = ({ isPublished, onDelete }) => {
  return (
    <>
      <Typography variant="h4" display="block">
        Status:{" "}
        {isPublished ? (
          <span style={{ display: "inline-block", color: "green" }}>
            Published
          </span>
        ) : (
          <span style={{ display: "inline-block", color: "red" }}>
            Not published
          </span>
        )}
      </Typography>
      <Button
        onClick={onDelete}
        color="primary"
        variant="contained"
        sx={{
          mr: "20px",
          fontSize: "32px",
          bgcolor: "red",
          color: "#fff",
          width: "200px",
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
        Delete
      </Button>
    </>
  );
};

export default InterfaceInfoUser;
