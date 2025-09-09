import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export class UserServices {
  public static async findById(userId: string): Promise<IUser | null> {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["accessToken", "password"] },
      raw: true,
    });
    return user ? (user as IUser) : null;
  }

  public static async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["accessToken"] },
      raw: true,
    });
    return user ? (user as IUser) : null;
  }

  public static async createUser(userData: IUser): Promise<IUser> {
    const newUser = await User.create(userData);
    return newUser.toJSON() as IUser;
  }

  public static async updateUser(
    userId: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    const rowsUpdated = await User.update(userData, {
      where: { _id: userId },
    });

    if (!rowsUpdated[0]) {
      return null;
    }

    return await this.findById(userId);
  }
}
