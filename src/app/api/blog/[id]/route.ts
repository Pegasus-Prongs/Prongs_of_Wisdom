// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import blogPosts from '../blogs';

// GET handler to fetch a blog post by ID
export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  // Find the blog post with the matching ID
  const post = blogPosts.find(post => post.id === parseInt(id as unknown as string));
  if (post) {
    return NextResponse.json(post); // Return the post if found
  } else {
    return NextResponse.json({ error: 'Blog post not found' }, { status: 404 }); // Return 404 if not found
  }
}
