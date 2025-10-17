import { FastifyInstance } from "fastify";

// Gets specific details from movies.
function filterMovies(movies: Object) {
  let filteredMovies = [];

  Object.values(movies["results"]).forEach((movie) => {
    const data = {
      id: movie["id"],
      title: movie["title"],
      overview: movie["overview"],
      poster: `https://image.tmdb.org/t/p/w500${movie["poster_path"]}`,
    };
    filteredMovies.push(data);
  });

  return filteredMovies;
}

async function getMovies(url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return JSON.stringify({ movies: filterMovies(data) });
  } catch (err) {
    console.log(err);
  }
}

async function routes(fastify: FastifyInstance, options) {
  // TMDB API
  const tmdbOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  fastify.get("/", async (request, reply) => {
    // Call the /trending logic internally
    return fastify
      .inject({
        method: "GET",
        url: `${fastify.prefix || ""}/trending`,
      })
      .then((res) => JSON.parse(res.body));
  });

  // Gets trending movies
  fastify.get("/trending", async (request, reply) => {
    return getMovies(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      tmdbOptions
    );
  });

  fastify.get("/search", async (request, reply) => {
    return getMovies(
      `https://api.themoviedb.org/3/search/movie?query=${request.query.q}&include_adult=true`,
      tmdbOptions
    );
  });
}

export default routes;
