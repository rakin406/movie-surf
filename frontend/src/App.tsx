import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
