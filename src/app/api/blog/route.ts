// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';

type BlogPost = {
  id: string;
  title: string;
  content: string;
};

// Mock data for demonstration
const blogPosts: BlogPost[] = [
  { id: '1', title: 'How React Transformed Modern Web Development', content: 'React has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-based architecture allows for more scalable and maintainable code, making it the go-to library for creating dynamic user interfaces.' },
  { id: '2', title: 'How React Transformed Modern Web Development', content: 'React has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-based architecture allows for more scalable and maintainable code, making it the go-to library for creating dynamic user interfaces.' },
  { id: '3', title: 'How React Transformed Modern Web Development', content: 'React has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-based architecture allows for more scalable and maintainable code, making it the go-to library for creating dynamic user interfaces.' },
  { id: '4', title: 'How React Transformed Modern Web Development', content: 'React has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-based architecture allows for more scalable and maintainable code, making it the go-to library for creating dynamic user interfaces.' },
  { id: '5', title: 'How React Transformed Modern Web Development', content: 'React has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-based architecture allows for more scalable and maintainable code, making it the go-to library for creating dynamic user interfaces.' },
  { id: '6', title: 'How React Transformed Modern Web Development', content: 'React has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-basedReact has revolutionized the way developers build web applications. Introduced by Facebook in 2013, React’s component-based architecture allows for more scalable and maintainable code, making it the go-to library for creating dynamic user interfaces.' },
  
];

export async function GET(request: Request) {
  return NextResponse.json(blogPosts);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newPost: BlogPost = {id: (blogPosts.length + 1).toString(), title: data.title, content: data.content};
  blogPosts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
