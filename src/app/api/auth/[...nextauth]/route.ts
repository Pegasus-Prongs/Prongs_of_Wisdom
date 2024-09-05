import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log( credentials)
        await connectToDatabase();

        const user = await User.findOne({ username: credentials?.username });
        console.log("User===>", user);
        if (user && bcrypt.compareSync(credentials?.password|| '', user.password)) {
          return { id: user._id, name: user.username };
        } else {
          return null;
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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to home page or any specific page upon successful sign-in
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

export async function GET(request: Request) {
  return NextAuth(request, authOptions);
}

export async function POST(request: Request) {
  return NextAuth(request, authOptions);
}
