'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setTimeout(() => {
    if (!document.querySelector('.dropdown-menu:hover')) {
      setIsDropdownOpen(false);
    }
  }, 100);
  
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname])

  return (
    <nav className="bg-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold">
                Prongs Of Wisdom
              </Link>
            </div>
            <div className="hidden md:flex md:ml-6">
              <div className="flex space-x-4">
                <Link href="/" className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-blue-700' : ''}`}>
                  Home
                </Link>
                <Link href="/about" className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/about' ? 'bg-blue-700' : ''}`}>
                  About
                </Link>
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith('/blog') || pathname === "/create_blog" ? 'bg-blue-700' : ''}`}
                  >
                    Blog
                  </button>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu absolute bg-gray-700 text-white mt-2 p-2 rounded-md shadow-lg w-48">
                      <li>
                        <Link
                          href="/blogs"
                          className={`block p-2 ${pathname === '/blogs' ? 'bg-blue-700' : ''}`}
                        >
                          All Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/create_blog"
                          className={`block p-2 ${pathname === '/create_blog' ? 'bg-blue-700' : ''}`}
                        >
                          Create Blog
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
                <Link href="/contact" className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/contact' ? 'bg-blue-700' : ''}`}>
                  Contact
                </Link>

              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center space-x-4 hidden md:flex">
              <Link
                href="/auth/signin"
                className=" bg-gradient-to-r border-2 border-white from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r border-2 border-white from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                Sign Up
              </Link>
            </div>
          </div>
          {/* Right-Side Buttons */}


        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </button>
          {isOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/blogs" className="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                All Blogs
              </Link>
              <Link href="/create_blog" className="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Create Blog
              </Link>
            </div>
          )}
          <Link href="/contact" className="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Contact
          </Link>
          <Link href="/auth/signin" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-md block">
            Log In
          </Link>
          <Link href="/auth/signup" className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-md block">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
