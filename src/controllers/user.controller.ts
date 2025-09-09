import { Request, Response } from "express";
import { UserServices } from "../services/user.service";
import { validateLogin, validateRegister } from "../validators/user.validator";
import { comparePassword, generateToken, hashPassword } from "../helpers";
import { IUser } from "../interfaces/user.interface";

export class UserController {
  public static async registerUser(req: Request, res: Response) {
    try {
      const value = await validateRegister(req.body);
      const { email, password } = value;

      const existingUser: IUser | null = await UserServices.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered. Please login instead.",
        });
      }

      const hashedPassword = await hashPassword(password);

      const user: IUser = await UserServices.createUser({
        ...value,
        password: hashedPassword,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: user,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to register user.",
      });
    }
  }

  public static async loginUser(req: Request, res: Response) {
    try {
      const value = await validateLogin(req.body);
      const { email, password } = value;

      const user: IUser | null = await UserServices.findByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email. Please register first.",
        });
      }

      const validPassword = await comparePassword(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password. Please try again.",
        });
      }

      const payload = { id: user._id, email: user.email };

      const token = generateToken(payload);

     const updatedUser= await UserServices.updateUser(user._id.toString(), {
        accessToken: token,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: {...updatedUser, accessToken: token},
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to login user.",
      });
    }
  }
}
