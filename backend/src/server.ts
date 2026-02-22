import "dotenv/config";
import closeWithGrace from "close-with-grace";

import app from "./app";

const start = async () => {
  // Delay is the number of milliseconds for the graceful close to finish
  // TODO: Use a constant delay set by environment variable.
  closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err != null) {
      app.log.error(err);
    }

    await app.close();
  });

  await app.ready();

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
