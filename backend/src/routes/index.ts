import { FastifyInstance } from "fastify";
import { MovieDb } from "moviedb-promise";

async function routes(fastify: FastifyInstance, options) {
  // Connect to TMDB API
  let moviedb = new MovieDb("your_api_key");

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  // Gets a list of trending movies
  fastify.get("/trending", async (request, reply) => {
    let promises = [];

    for (let i = 0; i < 30; ++i) {
      promises.push(
        moviedb.trending({
          media_type: "all",
          time_window: "week",
        })
      );
    }

    Promise.all(promises).then((values) => {
      return { movies: values };
    });
  });
}

export default routes;
