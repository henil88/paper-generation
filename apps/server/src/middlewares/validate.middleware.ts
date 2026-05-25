import type { NextFunction, Request, Response } from "express";
import type { ZodError, z } from "zod";

type ValidationLocation = "body" | "query" | "params" | "headers";

interface ValidationConfig {
  body?: z.ZodSchema;
  query?: z.ZodSchema;
  params?: z.ZodSchema;
  headers?: z.ZodSchema;
}

const formatZodErrors = (error: ZodError): Record<string, string[]> => {
  const formatted: Record<string, string[]> = {};

  error.issues.forEach((err) => {
    const path = err.path.join(".") || "general";
    if (!formatted[path]) formatted[path] = [];
    formatted[path].push(err.message);
  });

  return formatted;
};

export const validate = (schemas: ValidationConfig) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, unknown> = {};

    const locations: ValidationLocation[] = ["body", "query", "params", "headers"];

    for (const location of locations) {
      const schema = schemas[location];
      if (!schema) continue;

      const dataToValidate = req[location];
      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        errors[location] = formatZodErrors(result.error);
      } else {
        (req as unknown as Record<string, unknown>)[location] = result.data;
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        error: {
          message: "Validation failed",
          code: "VALIDATION_ERROR",
          errors,
        },
      });
      return;
    }

    next();
  };
};
