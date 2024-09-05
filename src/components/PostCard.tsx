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
        <div className="relative p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <Link href={`/blog/${id}`} className="block text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                {title}
            </Link>
            <p className="mt-2 mb-4 text-gray-700 text-sm">
                {truncateContent(content, 300)}
            </p>
            <Link href={`/blog/${id}`} className="absolute bottom-4 right-6 text-blue-500 hover:underline font-medium text-sm">
                Read more
            </Link>
        </div>
    )
}

export default PostCard;