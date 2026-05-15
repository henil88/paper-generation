import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().default(4000),
    DATABASE_URL: z.string().min(1),
    CORS_ORIGIN: z.url(),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .default("info"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
