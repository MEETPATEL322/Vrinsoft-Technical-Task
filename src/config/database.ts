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

// DB connection + model synchronization
export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully.");

    // Sync models automatically (use alter:true only in dev)
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized with DB.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
