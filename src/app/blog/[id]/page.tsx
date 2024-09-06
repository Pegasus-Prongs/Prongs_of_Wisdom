import React from "react";
import axios from 'axios';
import type BlogPost from "@/app/api/blog/blogpost.types"; // Import with type-only import

async function getBlogPost(id: string): Promise<BlogPost | null> {
    console.log("ID ===> ", id)
    try {
        const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
        return response.data; // Access the data from the response
    } catch (error) {
        console.error('Error fetching blog list:', error);
        return null; // Return an empty object in case of an error
    }
}

const BlogPost = async ({params} : { params: {id: string} }) => {

    const blogPost: BlogPost | null = await getBlogPost(params.id);

    return (
        <div className="max-w-4xl mx-auto my-12 px-8">
            <p className="text-3xl font-bold mb-2">{blogPost?.title}</p>
            <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: blogPost == null ? "" : blogPost?.content }} // Show only 300 characters
            />
        </div>
    )
}

export default BlogPost;