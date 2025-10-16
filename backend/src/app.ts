import Fastify from "fastify";
import cors from "@fastify/cors";

import routes from "./routes/index";

const app = Fastify({
  logger: true,
});

await app.register(cors, { origin: "*" });

await app.register(import("@fastify/swagger"));

await app.register(import("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.register(routes, { prefix: "/api/v1" });

export default app;
