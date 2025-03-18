"use client";

import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 focus:outline-none"
      >
        Menu
      </button>
      {isOpen && (
        <nav className="bg-gray-800 text-white p-4">
          <ul className="space-y-2">
            <li><a href="#" className="block p-2 hover:bg-gray-700">Home</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-700">About</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-700">Contact</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
} 