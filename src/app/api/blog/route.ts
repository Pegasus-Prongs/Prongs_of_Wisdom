// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';

type BlogPost = {
  id: string;
  title: string;
  content: string;
};

// Mock data for demonstration
const blogPosts: BlogPost[] = [
  { id: '1', title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: '2', title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(blogPosts);
}

export async function POST(request: NextRequest) {
  const newPost: BlogPost = await request.json();
  blogPosts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
