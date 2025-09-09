import { createClient } from "redis";
import { config } from "./config";

const client = createClient({ url: config.redis.url });
client.on("error", (err) => console.error("Redis Publisher Error:", err));

let ready = false;
client.connect().then(() => {
  ready = true;
  console.log("Redis publisher connected");
});

export async function publishRedis(message: any) {
  if (!ready) await new Promise((r) => setTimeout(r, 200));
  await client.publish(config.redis.channel, JSON.stringify(message));
}
