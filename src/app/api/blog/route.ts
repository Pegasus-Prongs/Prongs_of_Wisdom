// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import BlogPost from './blogpost.types';
import blogPosts from './blogs';

export async function GET(request: NextRequest) {
  // Parse the query parameters from the request URL
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  console.log("Request Query:", query);

  // Introduce a delay of 3 seconds
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(3000);

  // Filter blogPosts based on the query if necessary
  const filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredPosts);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newPost: BlogPost = {id: (blogPosts.length + 1), title: data.title, content: data.content};
  blogPosts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
