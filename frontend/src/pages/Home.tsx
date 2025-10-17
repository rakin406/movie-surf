import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import ShowMovies from "../components/ShowMovies";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const trending = useFetch("http://localhost:3000/api/v1/trending");

  return trending ? (
    <ShowMovies movies={trending} />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <CircularProgress size="3rem" />
    </Box>
  );
}

export default Home;
