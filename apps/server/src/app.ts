import { env } from "@paper-generation/env/server";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { httpLogger, notFoundMiddleware } from "@/middlewares";
import { errorMiddleware } from "@/middlewares/error.middleware";

export const app: Express = express();

app.disable("x-powered-by");
// requestId middleware
app.use(httpLogger);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api requests
app.get("/", (_, res) => res.json({ ok: true }));

app.use(notFoundMiddleware);
app.use(errorMiddleware);
