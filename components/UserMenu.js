"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const firstName = user.name?.split(" ")[0] || "ব্যবহারকারী";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <span className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
            {firstName.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="text-sm font-medium hidden sm:inline">{firstName}</span>
        <span className="text-xs text-gray-500">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-gray-200 shadow-lg p-4 z-50">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-gray-500 mb-3 break-all">{user.email}</p>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block py-2 text-sm hover:text-green-600"
          >
            👤 আমার প্রোফাইল
          </Link>

          <button
            onClick={handleSignOut}
            className="block w-full text-left py-2 text-sm text-red-600"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}