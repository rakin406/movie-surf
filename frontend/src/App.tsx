import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Home from "./pages/Home";

function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;
