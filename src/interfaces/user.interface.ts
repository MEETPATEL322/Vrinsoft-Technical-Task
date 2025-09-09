export interface IUser {
  _id: string;
  email: string;
  password: string;
  accessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
