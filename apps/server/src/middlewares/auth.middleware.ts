import { auth } from "@paper-generation/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

/**
 * Attach session to request if available.
 * Does not block unauthenticated requests.
 */
export const authMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (session) {
      req.user = session.user;
      req.session = session.session;
    }
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Require valid session. Sends 401 if not authenticated.
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    next(error);
  }
};
