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
    name,
    email,
    password: hashedPassword,
  });
  
  const savedUser = await user.save();
  

  createSession(savedUser._id);

  return redirect("/login");
}

export async function signin(state, formData) {
 

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
