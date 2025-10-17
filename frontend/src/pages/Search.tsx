import { useSearchParams } from "react-router-dom";

import ShowMovies from "../components/ShowMovies";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

function Search() {
  const [searchParams] = useSearchParams();
  // TODO: Handle no query.
  const query = searchParams.get("q") as string;
  const movies = useFetch(
    `http://localhost:3000/api/v1/search?q=${encodeURIComponent(query)}`,
    query
  );

  return movies ? <ShowMovies movies={movies} /> : <Loading />;
}

export default Search;
