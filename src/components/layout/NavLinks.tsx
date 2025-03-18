"use client";

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

export default function NavLinks() {
  const { isSignedIn, isLoaded } = useAuth();
  
  return (
    <ul className="space-y-2">
      <li>
        <Link href="/" className="block p-2 hover:bg-gray-700">
          Home
        </Link>
      </li>
      
      {isLoaded && isSignedIn ? (
        // Authenticated user links
        <>
          <li>
            <Link href="/collection" className="block p-2 hover:bg-gray-700">
              My Collection
            </Link>
          </li>
          <li>
            <Link href="/collection/list" className="block p-2 hover:bg-gray-700 pl-6 text-sm">
              List Game for Trade
            </Link>
          </li>
          <li>
            <Link href="/user-account" className="block p-2 hover:bg-gray-700">
              Account
            </Link>
          </li>
        </>
      ) : (
        // Non-authenticated user links
        <>
          <li>
            <Link href="/about" className="block p-2 hover:bg-gray-700">
              About
            </Link>
          </li>
          <li>
            <Link href="/login" className="block p-2 hover:bg-gray-700">
              Login
            </Link>
          </li>
          <li>
            <Link href="/signup" className="block p-2 hover:bg-gray-700">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
} 