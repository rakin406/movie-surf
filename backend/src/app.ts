import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/", async (request, reply) => {
  return { message: "Hello World" };
});

export default app;
