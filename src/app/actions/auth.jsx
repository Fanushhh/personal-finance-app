"use server";
import { LoginFormSchema, SignupFormSchema } from "../lib/definitions";
import { connectDB } from "../lib/mongo";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import User from "../models/User";
import { createClient } from 'redis';
const { REDIS_PASS, REDIS_URI, REDIS_PORT } = process.env;

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    }
});
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

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
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
  });
  await client.hSet(`user:${user.email}`, {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password
  } );
  client.disconnect();
  const savedUser = await user.save();
  

  createSession(savedUser.id);
  return redirect("/login");
}

export async function signin(state, formData) {
  
  
  const result  = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const cachedUser = await client.hGetAll(`user:${result.data.email}`);
  if(cachedUser){
    console.log('caching is called')
    const wrongPassword = !(await bcrypt.compare(
      result.data.password,
      cachedUser.password
    ));
    if (wrongPassword) {
      return {
        errors: {
          generalError: "Incorrect email or password",
        },
      };
    }
    client.disconnect();
    createSession(cachedUser.id);
    return redirect("/");
    
  }else{
    console.log('caching is not called')
    await connectDB();
    const user = await User.findOne({ email: result.data.email });
    const wrongPassword = !(await bcrypt.compare(
      result.data.password,
      user.password
    ));
    if (!user || wrongPassword) {
      return {
        errors: {
          generalError: "Incorrect email or password",
        },
      };
    }
  
    createSession(user.id);
  
    return redirect("/");
    
  }
  
}
