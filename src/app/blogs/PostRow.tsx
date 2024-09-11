import React from "react";
import axios from 'axios';
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import { fetchTotalPage } from "@/app/api/blog/route";
import BlogPost from "../api/blog/blogpost.types";

async function fetchBlogList(query: string, page: number): Promise<BlogPost[]> {
    console.log("query===>", query)
    console.log(page)
    try {
        const response = await axios.get(`http://localhost:3000/api/blog`, {
            params: { query,page } // Sending query as a query parameter
        });
        return response.data; // Access the data from the response
    } catch (error) {
        console.error('Error fetching blog list:', error);
        return []; // Return an empty array in case of an error
    }
}


export const PostRow = async ({ query, page }: { query: string, page: number }) => {
    const blogPosts = await fetchBlogList(query, page);
    const currentPage = Number(page) || 1;
   
    const totalPage = await fetchTotalPage(query);
   
    return (<>
        {blogPosts.length > 0 ? (
            <>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {blogPosts.map((post: BlogPost) => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </div>
                <Pagination totalPage={totalPage} currentPage={currentPage} />
            </>
        ) : (
            <p>No blog posts available.</p>
        )}
    </>)
}