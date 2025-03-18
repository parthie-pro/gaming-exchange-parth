"use client";

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 h-full p-4">
      <nav>
        <ul className="space-y-2">
          <li><a href="#" className="block p-2 hover:bg-gray-700">Home</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700">About</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700">Contact</a></li>
        </ul>
      </nav>
    </aside>
  );
} 