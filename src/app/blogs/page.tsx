import { PostRow } from '@/components/PostRow';
import SearchBar from '@/components/SearchBar';
import { BlogPostsSkeleton } from '@/components/Skeletons';

import React, { Suspense } from 'react';


export default async function BlogList({
    searchParams,
}: {
    searchParams?: {
        query: string; // Search query from the URL query parameters
    }
}) {
   const query = searchParams?.query || '';
    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <SearchBar className="m-6" />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                <Suspense key={query} fallback={<BlogPostsSkeleton />}>
                <PostRow query = {query}></PostRow>
                    
                </Suspense>

            </div>
        </div>
    )
}