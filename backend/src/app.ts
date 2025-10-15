import Fastify from "fastify";
import cors from "@fastify/cors";

import routes from "./routes/index";

const app = Fastify({
  logger: true,
});

await app.register(cors, { origin: "*" });

app.register(routes);

export default app;
