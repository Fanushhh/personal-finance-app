"use server";
import { LoginFormSchema, SignupFormSchema } from "../lib/definitions";
import { connectDB } from "../lib/mongo";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import User from "../models/User";
export async function signup(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Call the provider or db to create a user...

  await connectDB();
  const userExists = await User.findOne({ email });
  if (userExists) {
    return {
      errors: {
        email: "Email already exists",
      },
    };
  }
  const user = await User.create({
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  console.log(savedUser);

  createSession(savedUser.id);
}

export async function signin(state, formData) {
  // check the cookies if the user exists inside the cookies
  // if the user exists, then return the user
  // if the user does not exist, then return an error
  const result = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  await connectDB();
  const user = await User.findOne({ email: result.data.email });
  if (!user) {
    return {
      errors: {
        email: "Invalid email or password",
        password: [""],
      },
    };
  }
  const wrongPassword = !(await bcrypt.compare(
    result.data.password,
    user.password
  ));
  if (user.email !== result.data.email) {
    return {
      errors: {
        email: "Incorrect email",
        password: [""],
      },
    };
  }

  createSession(user.id);

  redirect("/");
}
