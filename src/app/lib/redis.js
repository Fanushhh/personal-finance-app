import { createClient } from "redis";
let client;
export const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      username: "default",
      password: process.env.REDIS_PASS,
      socket: {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT,
      },
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
  }
  return client;
};
