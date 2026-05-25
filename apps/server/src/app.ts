import { auth } from "@paper-generation/auth";
import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { corsConfig } from "@/config/cors.config";
import { errorMiddleware, httpLogger, notFoundMiddleware } from "@/middlewares";

export const app: Express = express();

app.disable("x-powered-by");
// requestId middleware
app.use(httpLogger);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors(corsConfig));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(compression());
app.use(cookieParser());

app.all("/api/auth/{*path}", toNodeHandler(auth));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// api requests
app.get("/", (_, res) => res.json({ ok: true }));

app.use(notFoundMiddleware);
app.use(errorMiddleware);
