import BlogPost from "@/app/api/blog/blogpost.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ id, title, content }: BlogPost) => {

    const truncateContent = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <div className="relative border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl duration-300 transform transition-transform hover:scale-105">
            <Image src="/slider_bg.png" className="w-full rounded-t-lg" width="100" height={1010} alt="Image for blog" />

            <div className="p-4">
                <Link href={`/blog/${id}`} className="block text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                    {title}
                </Link>

                <div className="mb-6 text-gray-700 text-sm mt-5" dangerouslySetInnerHTML={{ __html: truncateContent(content, 300) }} />
                <Link href={`/blog/${id}`} className="absolute bottom-4 right-6 text-blue-500 hover:underline font-medium text-sm">
                    Read more
                </Link>
            </div>
        </div>
    )
}

export default PostCard;