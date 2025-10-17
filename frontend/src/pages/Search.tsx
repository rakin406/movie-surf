import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ShowMovies from "../components/ShowMovies";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

function Search() {
  const [searchParams] = useSearchParams();
  // TODO: Handle no query.
  const query = searchParams.get("q") ?? "";
  const movies = useFetch(
    query
      ? `http://localhost:3000/api/v1/search?q=${encodeURIComponent(query)}`
      : "",
    query
  );

  if (!query) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Invalid Search
        </Typography>
      </Box>
    );
  }

  return movies ? <ShowMovies movies={movies} /> : <Loading />;
}

export default Search;
