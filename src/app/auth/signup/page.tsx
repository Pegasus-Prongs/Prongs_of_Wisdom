// src/app/auth/signup/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear previous errors

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await axios.post('/api/auth/signup', { username, password: hashedPassword });
      router.push('/auth/signin');
    } catch (error) {
      setErrorMessage('Sign-up failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:w-1/3 md:w-2/3 bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl mb-4">Sign Up</h1>

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border mb-4 p-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border mb-4 p-2 w-full"
          />
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
