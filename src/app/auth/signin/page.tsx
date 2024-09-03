"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if(result == null || result === undefined) {
      alert("ABC")
    }

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      router.push('/'); // Redirect to home page
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="lg:w-1/3 md:w-2/3 bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl mb-4">Sign In</h1>

        <form
          className='py-10'
          onSubmit={handleOnSubmit}
        >
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
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in with Credentials'}
          </button>
        </form>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded w-full flex items-center justify-center"
          onClick={() => signIn('google')}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
