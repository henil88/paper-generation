import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z, { ZodError } from "zod";
import { logger } from "@/lib/logger";
import { AppError } from "@/utils/AppError";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error({ error, requestId: req.id }, "Request failed");

  if (error instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        message: "Validation failed",
        details: z.flattenError(error),
      },
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: { message: "Internal Server Error" },
  });
};
