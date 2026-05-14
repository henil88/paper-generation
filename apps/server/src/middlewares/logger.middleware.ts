import pinoHTTP from "pino-http";
import { logger } from "@/lib/logger";

export const httpLogger = pinoHTTP({
  logger,
  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} completed with ${res.statusCode}`;
  },
  customErrorMessage(req, _, error) {
    return `${req.method} ${req.url} failed: ${error.message}`;
  },
});
