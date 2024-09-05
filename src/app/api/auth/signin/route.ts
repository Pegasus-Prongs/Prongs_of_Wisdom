// src/app/api/auth/signin/route.ts

import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { username, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ username: username });
    console.log(user)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return success response or token if needed
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json({ error: 'An error occurred during sign-in' }, { status: 500 });
  }
}
