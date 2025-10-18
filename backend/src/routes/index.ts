import { FastifyInstance } from "fastify";

// Gets magnet link of movie using Jackett API.
async function getMagnetLink(movieTitle: string) {
  const url = `http://localhost:9117/api/v2.0/indexers/all/results \
    ?apikey=${process.env.JACKETT_API_KEY}&Query=${movieTitle}&Category[]=2000`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.Results;

    // Magnet link doesn't exist
    if (!results || results.length === 0) {
      return null;
    }

    // Sort by seeders descending
    const sorted = results.sort((a: any, b: any) => b.Seeders - a.Seeders);

    // Take the top 20 and pick the highest seeded
    const top20 = sorted.slice(0, 20);
    const highestSeeded = top20[0];

    return highestSeeded.MagnetUri;
  } catch (err) {
    console.log(err);
  }

  return null;
}

function getRequiredDetails(movie: Object) {
  const data = {
    id: movie["id"],
    title: movie["title"],
    overview: movie["overview"],
    poster: `https://image.tmdb.org/t/p/w500${movie["poster_path"]}`,
  };
  return data;
}

// Gets specific details from movies.
function filterMovies(movies: Object) {
  let filteredMovies = [];

  Object.values(movies["results"]).forEach((movie) => {
    // Sometimes the poster_path is null. In that case,
    // skip it.
    if (!movie["poster_path"]) return;
    filteredMovies.push(getRequiredDetails(movie));
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

  fastify.get("/watch/:id", async (request, reply) => {
    const id = request.params;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        tmdbOptions
      );
      const data = await res.json();

      // Movie not found
      if (
        (data.hasOwnProperty("success") && !data["success"]) ||
        !data["poster_path"]
      ) {
        return null;
      }

      return JSON.stringify(getRequiredDetails(data));
    } catch (err) {
      console.log(err);
    }

    return null;
  });
}

export default routes;
