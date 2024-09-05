// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  console.log(username, password);
  try {
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Create a new user
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("User and Password", username, password, hashedPassword);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error: error }, { status: 500 });
  }
}
