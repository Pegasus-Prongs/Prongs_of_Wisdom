import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log("Credentials===>", credentials);
        await connectToDatabase();

        const user = await User.findOne({ username: credentials?.username });
        console.log('User===>', user);
        if (user && bcrypt.compareSync(credentials?.password || '', user.password)) {
          return { id: user._id, name: user.username };
        } else {
          throw new Error('Invalid username or password'); 
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Customize the sign-in page route
    // Optionally, add signUp page route if needed
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  
};

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  return NextAuth(request, response, authOptions);
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  return NextAuth(request, response, authOptions);
}

export const authOptionsWithRedirect = {
  ...authOptions,
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to home page or any specific page upon successful sign-in
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
}