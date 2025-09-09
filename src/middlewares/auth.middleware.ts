import { Request, Response, NextFunction } from "express";
import { UserServices } from "../services/user.service";
import { CustomRequest, IUser } from "../interfaces/user.interface";
import { verifyToken } from "../helpers";

/**
 * Auth middleware to protect routes
 */
export async function authUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = (req.headers as any)?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or not a Bearer token.",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please login again.",
      });
    }

    const user: IUser | null = await UserServices.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    if (!user.accessToken || user.accessToken !== token) {
      return res.status(401).json({
        success: false,
        message: "Token is no longer valid. Please login again.",
      });
    }

    req.user = { id: user._id, email: user.email };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
}
