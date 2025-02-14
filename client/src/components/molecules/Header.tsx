"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">Tradepost</Link>
        <Link href="/user" className="underline">
          Portfolio
        </Link>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login/Logout
      </button>
    </header>
  );
}
