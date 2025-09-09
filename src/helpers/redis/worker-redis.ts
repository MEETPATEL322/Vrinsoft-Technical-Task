// worker-redis.ts
import { createClient } from "redis";
import { connectDB } from "../../config/database";
import { config } from "../../config";
import { Event } from "../../models/event.model";

async function start() {
  await connectDB();

  const sub = createClient({ url: config.redis.url });
  sub.on("error", (e) => console.error("Redis sub error:", e));
  await sub.connect();

  console.log("✅ Redis worker listening...");

  await sub.subscribe(config.redis.channel, async (msg) => {
    try {
      const data = JSON.parse(msg);
      console.log("➡️ Worker received", data);

      await Event.update(
        { status: "processed" },
        { where: { _id: data.eventId } }
      );

      // Emit to all connected Socket.IO clients
      //   io.emit("event_notification", {
      //     eventId: data.eventId,
      //     title: data.title,
      //     payload: data.payload,
      //     userId: data.userId,
      //     timestamp: new Date().toISOString(),
      //   });

      console.log("✅ Broadcasted via Socket.IO");
    } catch (err) {
      console.error("❌ Worker error:", err);
    }
  });
}

start().catch((e) => {
  process.exit(1);
});
