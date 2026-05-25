import { isAPIError } from "better-auth/api";
import type { Response } from "express";

// Map Better Auth status to HTTP status codes
const statusCodeMap: Record<string, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export const handleBetterAuthError = (error: unknown, res: Response): boolean => {
  if (isAPIError(error)) {
    const statusCode = statusCodeMap[error.status] || 500;

    res.status(statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.status,
        ...(error.body && { details: error.body }),
      },
    });

    return true;
  }

  return false;
};
