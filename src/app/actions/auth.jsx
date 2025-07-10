"use server";
import { LoginFormSchema, SignupFormSchema } from "../lib/definitions";
import { connectDB } from "../lib/mongo";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import User from "../models/User";
import { getRedisClient } from "../lib/redis";

export async function signup(state, formData) {
  const client = await getRedisClient();

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: formData,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Call the provider or db to create a user...
  console.time("mongodb connect");
  await connectDB();
  console.timeEnd("mongodb connect");
  console.time("find user");
  const userExists = await User.findOne({ email });

  if (userExists) {
    return {
      errors: {
        email: "Email already exists",
      },
    };
  }

  console.timeEnd("find user");
  console.time("create user");
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.timeEnd("create user");
  console.time("Redis set");
  console.log(user._id);
  await client.hSet(`user:${user.email}`, {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    password: user.password,
  });
  console.timeEnd("Redis set");
  console.time("save user");
  const savedUser = await user.save();
  console.timeEnd("save user");

  createSession(savedUser._id);

  return redirect("/login");
}

export async function signin(state, formData) {
  let client;
  try {
    client = await getRedisClient();
  } catch (err) {
    console.error("Redis connection failed:", err);
  }

  const result = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  let cachedUser = null;

  if (client) {
    cachedUser = await client.hGetAll(`user:${email}`);
  }

  if (cachedUser && cachedUser.email) {
    console.log("Using Redis cache");

    const wrongPassword = !(await bcrypt.compare(password, cachedUser.password));
    if (wrongPassword) {
      return {
        errors: {
          generalError: "Incorrect email or password",
        },
      };
    }

    await createSession(cachedUser.id);
    return redirect("/");
  }

  console.log("Fallback to MongoDB");

  await connectDB();
  const user = await User.findOne({ email });
  if (!user) {
    return {
      errors: {
        generalError: "Incorrect email or password",
      },
    };
  }

  const wrongPassword = !(await bcrypt.compare(password, user.password));
  if (wrongPassword) {
    return {
      errors: {
        generalError: "Incorrect email or password",
      },
    };
  }

  await createSession(user._id);
  return redirect("/");
}
