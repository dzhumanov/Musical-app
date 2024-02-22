import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/Artists";
import OneArtist from "./features/artists/components/OneArtist";
import OneAlbum from "./features/albums/components/OneAlbum";

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
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
