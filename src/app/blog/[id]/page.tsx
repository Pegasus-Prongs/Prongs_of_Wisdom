import React from "react";
import Image from "next/image";
import axios from 'axios';
import type BlogPost from "@/app/api/blog/blogpost.types"; // Import with type-only import

async function getBlogPost(id: string): Promise<BlogPost | null> {
    console.log("ID ===> ", id);
    try {
        const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
        return response.data; // Access the data from the response
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null; // Return null in case of an error
    }
}

const BlogPost = async ({ params }: { params: { id: string } }) => {
    const blogPost: BlogPost | null = await getBlogPost(params.id);

    return (
        <div className="max-w-3xl mx-auto my-12 px-6 sm:px-8 lg:px-10">
            {blogPost ? (
                <>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blogPost.title}</h1>
                    {blogPost.image && (
                        <Image
                            width={1010}
                            height={1010}
                            src={blogPost.image} // Ensure this field is in your BlogPost type
                            alt={blogPost.title} // Use the title as alt text for accessibility
                            className="w-full h-auto rounded-lg shadow-md mb-6" // Modern image styling
                        />
                    )}
                    <div
                        className="text-gray-700 text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blogPost.content }} // Render blog content
                    />
                </>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
}

export default BlogPost;
