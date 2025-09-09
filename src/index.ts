import express from "express";
import { config } from "./config/index";
import cors from "cors";
import { connectDB } from "./config/database";
import Routes from "./routes";

const app = express();
const PORT = config.port;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome Meet" });
});

app.use("/api", Routes);

// Start server + connect DB
app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await connectDB();
});
