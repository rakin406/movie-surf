import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import Home from "./pages/Home";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Container maxWidth="xl">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Container>
  );
}

export default App;
