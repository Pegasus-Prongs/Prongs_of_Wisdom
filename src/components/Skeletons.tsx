import React from "react"
export const BlogPostSkeleton = () => {
    return (
        <div className="relative p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-100 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div> {/* Title placeholder */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 1 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 2 */}
            <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div> {/* Content line 3 */}
            <div className="absolute bottom-4 right-6 h-4 bg-gray-300 rounded w-24"></div> {/* Read more placeholder */}
        </div>
    )
}

export const BlogPostsSkeleton = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <BlogPostSkeleton key={index} />
            ))}
        </>
    )
}