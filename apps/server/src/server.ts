import http from "node:http";
import { env } from "@paper-generation/env/server";
import { app } from "@/app";
import { logger } from "@/lib/logger";

const server = http.createServer(app);

process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught Exception");
  process.exit(1);
});

const startServer = async () => {
  try {
    // connect db

    const PORT = env.PORT;

    server.listen(PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error({ error }, "Failed to start server");
    process.exit(1);
  }
};

const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown`);
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Force shutting down.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGALRM", () => gracefulShutdown("SIGALRM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  logger.error(reason, "Unhandled Promise Rejection");

  gracefulShutdown("unhandledRejection");
});

void startServer();
