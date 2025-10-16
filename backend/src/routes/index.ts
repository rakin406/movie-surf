import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance, options) {
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
    // TMDB API
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      return data;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to fetch trending movies" });
    }
  });
}

export default routes;
