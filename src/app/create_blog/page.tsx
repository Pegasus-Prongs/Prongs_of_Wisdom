'use client'
import exp from 'constants';
import dynamic from 'next/dynamic';
// import MyEditor from "@/components/MyEditor";
import React, { useState } from "react";
const MyEditor = dynamic(() => import('@/components/MyEditor'), {
    ssr: false, // Disable server-side rendering
});

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
            <form className="space-y-4">
                {/* Title Input */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter blog title"
                    />
                </div>

                {/* Content Textarea */}
                <div className="flex flex-col">
                    <label htmlFor="content" className="text-lg font-medium text-gray-700 mb-2">Content</label>
                    <MyEditor id='content' value={content} onChange={setContent} />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create Blog Post
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;