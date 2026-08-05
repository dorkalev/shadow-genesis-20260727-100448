import type { NextFunction, Request, RequestHandler, Response } from "express";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export interface Principal {
  uid: string;
  email?: string;
  authTime: number;
}

declare global {
  namespace Express {
    interface Request {
      principal?: Principal;
    }
  }
}

export function bearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const match = /^Bearer\s+([^\s]+)$/i.exec(header.trim());
  return match?.[1] ?? null;
}

export function ownsSubject(principal: Principal, subjectId: string): boolean {
  if (principal.uid === subjectId) return true;
  return !!principal.email && principal.email.toLowerCase() === subjectId.toLowerCase();
}

export function recentlyAuthenticated(principal: Principal, nowSeconds: number, maxAgeSeconds = 900): boolean {
  return principal.authTime > 0 && nowSeconds - principal.authTime >= 0 && nowSeconds - principal.authTime <= maxAgeSeconds;
}

type VerifyToken = (token: string) => Promise<{ uid: string; email?: string; auth_time?: number }>;

function firebaseVerifier(): VerifyToken {
  const firebaseApp = getApps()[0] ?? initializeApp();
  const auth = getAuth(firebaseApp);
  return (token) => auth.verifyIdToken(token, true);
}

export function firebaseAuthentication(verify: VerifyToken = firebaseVerifier()): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = bearerToken(req.header("authorization"));
    if (!token) {
      res.status(401).json({ error: "authentication_required" });
      return;
    }
    try {
      const decoded = await verify(token);
      if (!decoded.uid) throw new Error("token has no uid");
      req.principal = { uid: decoded.uid, email: decoded.email, authTime: decoded.auth_time ?? 0 };
      next();
    } catch {
      res.status(401).json({ error: "invalid_or_revoked_token" });
    }
  };
}

export const requireFirebaseAuth = firebaseAuthentication();
