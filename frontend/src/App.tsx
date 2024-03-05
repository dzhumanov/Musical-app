import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/Artists";
import OneArtist from "./features/artists/components/OneArtist";
import OneAlbum from "./features/albums/components/OneAlbum";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import TrackHistory from "./features/trackHistory/TrackHistory";
import CreateArtist from "./features/artists/CreateArtist";
import CreateAlbum from "./features/albums/CreateAlbum";

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/artists/:id" element={<OneArtist />} />
            <Route path="/albums/:id" element={<OneAlbum />} />
            <Route path="/trackHistory" element={<TrackHistory />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/artists/create" element={<CreateArtist/>} />
            <Route path="/albums/create" element={<CreateAlbum/>} />

            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
