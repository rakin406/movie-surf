import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}

export default routes;
