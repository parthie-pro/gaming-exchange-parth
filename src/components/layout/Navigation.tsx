"use client";

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

export default function Navigation() {
  const { isSignedIn, isLoaded } = useAuth();
  
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        
        {isLoaded && isSignedIn ? (
          // Authenticated user links
          <>
            <li>
              <Link href="/collection" className="text-white hover:text-gray-300">
                My Collection
              </Link>
            </li>
            <li>
              <Link href="/collection/list" className="text-white hover:text-gray-300">
                List for Trade
              </Link>
            </li>
            {/* These links will be implemented in future steps */}
            <li>
              <Link 
                href="/user-account"
                className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
              >
                Account
              </Link>
            </li>
          </>
        ) : (
          // Non-authenticated user links
          <>
            <li>
              <Link href="/about" className="text-white hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/sign-in" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link 
                href="/sign-up"
                className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
} 