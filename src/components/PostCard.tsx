import Link from "next/link";
import React from "react";

interface PostCardProps {
    id: string;
    title: string;
    content: string;
}

const PostCard  = ({ id, title, content}: PostCardProps) => {

    const truncateContent = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };


    return (
        <div className=" p-4 border rounded-lg shadow-md bg-white">
            <Link className="text-3xl font-bold mb-2" href={`/blog/${id}`}>{title}</Link>
            <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: truncateContent(content, 300) }} // Show only 300 characters
            />
            <Link href={`/blog/${id}`} className="text-blue-500 hover:underline">
                Read more
            </Link>
        </div>
    )
}

export default PostCard;