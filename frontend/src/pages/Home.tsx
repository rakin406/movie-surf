import ShowMovies from "../components/ShowMovies";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const trending = useFetch("http://localhost:3000/api/v1/trending");
  return trending ? <ShowMovies movies={trending} /> : <Loading />;
}

export default Home;
