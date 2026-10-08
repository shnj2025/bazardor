"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryLinks({ categories }) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
        {categories.map((c) => {
          const href = `/category/${c.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={c.id}
              href={href}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                active
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {c.icon} {c.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}