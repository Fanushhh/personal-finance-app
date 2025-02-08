"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { signup } from "@/app/actions/auth";
export const maxDuration = 60; // Applies to the actions

export default function SignUpForm() {
   const [userData, setUserData] = useState({
      username:'',
      email:'',
      password:''
    });
    const handleChange = (e) => {
      const {name, value} = e.target;
      
      setUserData((prev) => ({
        ...prev,
        [name]: value
      }))
      
    }
  const [state, action, pending] = useActionState(signup, undefined);
  
  return (
    <div className="max-[1200px]:w-full w-2/3 flex items-center justify-center">
      <form
        action={action}
        className="max-w-[560px] flex flex-col w-full gap-4"
      >
        <h1 className="text-4xl font-bold mb-6">Sign-up</h1>
        <div className="flex flex-col gap-3 ">
          <label htmlFor="username">Name</label>
          <input value={userData.username} onChange={handleChange} type="text" name="username" id="username" autoComplete="off"/>
        </div>
        {state?.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
        <div className="flex flex-col gap-3 ">
          <label htmlFor="email">Email</label>
          <input value={userData.email} onChange={handleChange} type="text" name="email" id="email" autoComplete="off"/>
        </div>
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <div className="flex flex-col gap-3 ">
          <label htmlFor="password">Password</label>
          <input value={userData.password} onChange={handleChange} type="password" name="password" id="password" autoComplete="off"/>
        </div>
        {state?.errors?.password && (
          <div className="text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="bg-[var(--gray-900)] text-white py-4 rounded-xl mt-2 hover:bg-[var(--gray-500)] transition-colors ease-in-out"
        >
          Sign up
        </button>
        <p className="mt-4 text-center text-[var(--gray-500)]">
          Need to create an account?{" "}
          <Link href="/login" className="text-black underline">
            Sign-in
          </Link>
        </p>
      </form>
    </div>
  );
}
