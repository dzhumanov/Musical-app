import { NavLink } from "react-router-dom";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link to="/">Spotify</Link>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
