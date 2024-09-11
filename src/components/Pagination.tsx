// components/Pagination.js
'use client'
import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPage }) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handleClick = (page) => {
        if (page > 0 && page <= totalPage) {
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            replace(`${pathname}?${params.toString()}`);
        }
    };
    const renderPageNumbers = () => {
        const range = [];
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPage - 1, currentPage + 2);

        range.push(1);
        if (startPage > 2) range.push('...');
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
        if (endPage < totalPage - 1) range.push('...');
        range.push(totalPage);

        return range;
    };

    return (
        <div className="flex justify-center items-center mt-4">
            {/* Previous Button */}
            <button
                onClick={() => handleClick(currentPage - 1)}
                className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {/* Page Numbers */}
            <div className="mx-2">
                {renderPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handleClick(page)}
                        className={`px-3 py-1 mx-1 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handleClick(currentPage + 1)}
                className={`px-3 py-1 rounded-lg ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={currentPage === totalPage}
            >
                Next
            </button>
        </div>
    );
}
function replace(arg0: string) {
    throw new Error('Function not implemented.');
}

