import http from "node:http";
import { db, pool } from "@paper-generation/db";
import { env } from "@paper-generation/env/server";
import { sql } from "drizzle-orm";
import { app } from "@/app";
import { logger } from "@/lib/logger";

const server = http.createServer(app);

process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught Exception");
  process.exit(1);
});

const startServer = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    logger.info("Database connected");
    server.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error({ error }, "Failed to start server");
    process.exit(1);
  }
};

const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown`);
  server.close(async () => {
    logger.info("HTTP server closed.");
    await pool.end();
    logger.info("Database pool closed.")
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Force shutting down.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  logger.error(reason, "Unhandled Promise Rejection");

  gracefulShutdown("unhandledRejection");
});

void startServer();
