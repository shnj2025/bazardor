"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";

export default function SortedProducts({ products }) {
  const [sort, setSort] = useState("default");

  let list = [...products]; // copy, so the original order is kept

  if (sort === "asc") {
    list.sort((a, b) => a.today - b.today); // low to high
  } else if (sort === "desc") {
    list.sort((a, b) => b.today - a.today); // high to low
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-end gap-3">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <ProductGrid products={list} />
    </>
  );
}