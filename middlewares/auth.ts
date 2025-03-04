import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
declare module "express" {
  interface Request {
    user?: string | JwtPayload;
  }
}
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "");
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}
