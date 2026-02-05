"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">FinTrack</h1>

      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/finance" className="hover:underline">
          Finance
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <button
          className="p-2 rounded-xl bg-amber-400 hover:bg-amber-600 active:bg-amber-800  active:text-white cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
