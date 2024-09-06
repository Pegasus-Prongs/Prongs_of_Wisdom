import React from "react";
import axios from 'axios';
import PostCard from "./PostCard";

interface IBlogPost {
    id: string;
    title: string;
    content: string;
}

async function fetchBlogList(query : string): Promise<IBlogPost[]> {
    console.log("query===>", query)
    try {
        const response = await axios.get(`http://localhost:3000/api/blog`, {
            params: { query } // Sending query as a query parameter
        });
        return response.data; // Access the data from the response
    } catch (error) {
        console.error('Error fetching blog list:', error);
        return []; // Return an empty array in case of an error
    }
}


export const PostRow = async ({query}: {query: string}) => {
    const blogPosts = await fetchBlogList(query);

    return (<>
        {blogPosts.length > 0 ? (
            blogPosts.map((post: IBlogPost) => (
                <PostCard key={post.id} {...post} />
            ))
        ) : (
            <p>No blog posts available.</p>
        )}
    </>)
}