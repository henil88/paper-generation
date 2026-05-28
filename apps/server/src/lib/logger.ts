import { env } from "@paper-generation/env/server";
import pino from "pino";

const isDevelopment = env.NODE_ENV !== "production";

const destination = pino.destination({
  dest: "./logs/app.log",
  sync: false,
});

export const logger = pino(
  {
    level: env.LOG_LEVEL,
    transport: isDevelopment
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  },
  destination,
);
