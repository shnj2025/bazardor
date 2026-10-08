import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import { toBn } from "@/lib/format";
import SortedProducts from "@/components/SortedProducts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const categories = await getCategories();
  const products = await getProducts();

  const category = categories.find((c) => c.slug === slug);
  const items = products.filter((p) => p.category === slug);

  // Bad slug, or a category with no products
  if (!category || items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="text-2xl font-bold mt-4">কোনো পণ্য পাওয়া যায়নি</h1>
        <p className="text-gray-500 mt-2">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ঠিকানাটি সঠিক নয়।
        </p>
        <Link href="/" className="btn btn-success text-white mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <SortedProducts products={items} />
    </main>
  );
}