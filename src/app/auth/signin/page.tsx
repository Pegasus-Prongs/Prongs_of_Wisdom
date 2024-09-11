// src/app/auth/signin/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    // if (result?.error) {
    //   setErrorMessage("Invalid username or password");
    // } else {
    //   // window.location.href = "/";
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="lg:w-1/3 md:w-2/3 bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl mb-4">Sign In</h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form className="py-10" onSubmit={handleOnSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="border mb-4 p-2 w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border mb-4 p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Sign in with Credentials
          </button>
        </form>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
