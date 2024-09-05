import PostCard from '@/components/PostCard';
import axios from 'axios';
import React from 'react';
interface IBlogPost {
    id: string;
    title: string;
    content: string;
}

async function fetchBlogList(): Promise<IBlogPost[]> {
    try {
        const response = await axios.get('http://localhost:3000/api/blog');
        return response.data; // Access the data from the response
    } catch (error) {
        console.error('Error fetching blog list:', error);
        return []; // Return an empty array in case of an error
    }
}

export default async function BlogList() {
    const blogPosts = await fetchBlogList();
    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

                {blogPosts.length > 0 ? (
                    blogPosts.map((post: IBlogPost) => (
                        <PostCard key={post.id} {...post} />
                    ))
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
        </div>
    )
}