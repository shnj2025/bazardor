import Link from "next/link";
import { getCategories } from "@/lib/api";
import { todayBn } from "@/lib/format";
import CategoryLinks from "./CategoryLinks";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="bg-green-600 rounded-xl p-2">
            <img src="/images/logo-icon.png" alt="logo" className="w-6 h-6" />
          </span>
          <div>
            <p className="font-bold text-lg leading-tight">বাজার দর</p>
            <p className="text-xs text-gray-500">{todayBn()}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="btn btn-success text-white btn-sm sm:btn-md"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <CategoryLinks categories={categories} />
    </header>
  );
}