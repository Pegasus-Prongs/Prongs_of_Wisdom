// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import BlogPost from './blogpost.types';
import blogPosts from './blogs';

export async function GET(request: NextRequest) {
  try {
    // Parse the query parameters from the request URL
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const page = Number(url.searchParams.get('page')) || 1;

    if (page < 1) {
      throw new Error('Invalid page number');
    }

    console.log("Request Query:", query);
    console.log("Request Page:", page);

    // Introduce a delay of 3 seconds
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);

    // Filter blogPosts based on the query
    const filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    ).slice(12 * (page - 1), 12 * page);

    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newPost: BlogPost = { id: (blogPosts.length + 1), title: data.title, content: data.content };
  blogPosts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}

export async function fetchTotalPage(query: string) {
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase())
  );
  return Math.ceil(filteredPosts.length / 12);
}

export async function fetchLatestPosts() {
  const latestPosts = blogPosts.sort(() => Math.random() - 0.5).slice(0, 6);
  return latestPosts;
}

export async function fetchPopularPosts() {
  const popularPosts = blogPosts.sort(() => Math.random() - 0.5).slice(0, 6);
  return popularPosts;
}

