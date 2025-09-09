import express from "express";
import { config } from "./config/index";
import cors from "cors";
import { connectDB } from "./config/database";
import Routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket";

const app = express();
const PORT = config.port;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome Meet" });
});

app.use("/api", Routes);

const server = createServer(app);
const io = new Server(server);

server.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await connectDB();
  initializeSocket(io);
});
