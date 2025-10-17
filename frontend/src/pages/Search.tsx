import ShowMovies from "../components/ShowMovies";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

function Search({ title }: { title: string }) {
  const movies = useFetch(
    `http://localhost:3000/api/v1/search?q=${encodeURIComponent(title)}`
  );
  return movies ? <ShowMovies movies={movies} /> : <Loading />;
}

export default Search;
