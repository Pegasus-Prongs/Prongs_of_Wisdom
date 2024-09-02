// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        {/* <div className="flex-shrink-0">
          <Link href="/">
            <a className="text-2xl font-bold">MyBlog</a>
          </Link>
        </div>
        <div className="hidden sm:flex sm:ml-6">
          <div className="flex space-x-4">
            <Link href="/">
              <a className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
            </Link>
            <Link href="/blog">
              <a className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  </div>
  <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
    {/* <div className="px-2 pt-2 pb-3 space-y-1">
      <Link href="/">
        <a className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
      </Link>
      <Link href="/about">
        <a className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
      </Link>
      <Link href="/blog">
        <a className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blog</a>
      </Link>
      <Link href="/contact">
        <a className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
      </Link>
    </div> */}
  </div>
</nav>
  );
}
