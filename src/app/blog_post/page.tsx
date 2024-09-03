'use client'
import exp from 'constants';
import dynamic from 'next/dynamic';
// import MyEditor from "@/components/MyEditor";
import React, { useState } from "react";
const MyEditor = dynamic(() => import('@/components/MyEditor'), {
    ssr: false, // Disable server-side rendering
  });

const BlogPost = () => {
    const [content, setContent] = useState("");
    return (
        <MyEditor value = {content} onChange={setContent} />
    );
}

export default BlogPost;