"use client";

import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Gaming Exchange</h1>
        <Navigation />
      </div>
    </header>
  );
} 