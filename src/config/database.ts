import { Sequelize } from "sequelize";
import { config } from "../config/index.ts";

export const sequelize: Sequelize = new Sequelize(
  config.db.name as string,
  config.db.user as string,
  config.db.password as string,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    logging: false,
  }
);

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully.");

    // await sequelize.sync({ alter: true });
    //  await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("All tables synchronized with DB.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
