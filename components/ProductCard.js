import Link from "next/link";
import { toBn, unitLabel, pctBn } from "@/lib/format";

export default function ProductCard({ p }) {
  const dir = p.change.dir;
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const badgeStyle =
    dir === "up"
      ? "bg-red-50 text-red-600"
      : dir === "down"
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";

  return (
    <Link
      href={`/product/${p.slug}`}
      className="block bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
          {p.image}
        </div>
        <div>
          <h3 className="font-semibold">{p.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitLabel(p.unit)}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">
          {toBn(p.today)} <span className="text-sm font-normal">টাকা</span>
        </p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyle}`}
        >
          {arrow} {pctBn(p.change.pct)}%
        </span>
      </div>
    </Link>
  );
}