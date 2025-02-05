"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signin } from "@/app/actions/auth";
export const maxDuration = 60; // Applies to the actions

export default function SignInForm() {
  const [state, action, isPending] = useActionState(signin, undefined);

  return (
    <div className="max-[1200px]:w-full w-2/3 flex items-center justify-center">
      <form
        action={action}
        className="max-w-[560px] flex flex-col w-full gap-4"
      >
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <div className="flex flex-col gap-3 ">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <div className="flex flex-col gap-3 ">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        {state?.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
        <button
          type="submit"
          className="bg-[var(--gray-900)] text-white py-4 rounded-xl mt-2 hover:bg-[var(--gray-500)] transition-colors ease-in-out"
        >
          { isPending ? <img src="./assets/images/loading.svg" alt="loading" className="w-10 mx-auto" /> : "Login"}
        </button>
        <p className="mt-4 text-center text-[var(--gray-500)]">
          Need to create an account?{" "}
          <Link href="/sign-up" className="text-black underline">
          Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
