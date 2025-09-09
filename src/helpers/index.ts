import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/index";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export interface JWTPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: JWTPayload): string => {
  if (!config.jwt.secret) {
    throw new Error("JWT secret is not defined in config");
  }
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    if (!config.jwt.secret) {
      throw new Error("JWT secret is not defined in config");
    }
    return jwt.verify(token, config.jwt.secret) as JWTPayload;
  } catch (error) {
    return null;
  }
};
