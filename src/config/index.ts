import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const config = {
  port: process.env.PORT || 3001,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    name: process.env.DB_NAME || "vinsoft",
  },
  //   jwt: {
  //     secret: process.env.JWT_SECRET || "defaultsecret",
  //     refreshSecret: process.env.JWT_REFRESH_SECRET || "refreshsecret",
  //     expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  //   },
};
