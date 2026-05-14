import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: {
      message: `Route not found: ${req.originalUrl}`,
    },
  });
};
