// src/app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      // Handle authentication error
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // Redirect to the home page or a protected route
    return NextResponse.redirect('/protected');
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json({ error: 'An error occurred during sign-in' }, { status: 500 });
  }
}
