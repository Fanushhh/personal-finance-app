import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error("Missing MONGO_URI in .env file");

let cached = global.mongoose || { conn: null, promise: null };


export const connectDB = async () => {
  console.log("Connecting to DB");
  
  if (cached.conn) return cached.conn;
  console.log("No cached connection, creating new connection");
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // Set the max connection pool size
      minPoolSize: 5,  // Maintain at least 5 connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
