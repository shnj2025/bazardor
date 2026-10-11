import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { toBn, priceBn, unitLabel, pctBn } from "@/lib/format";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // 1. Must be logged in
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?protected=1");

  // 2. Product must exist
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  // 3. Calculate the summary
  const rows = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = Math.min(...p.markets.map((m) => m.min));
  const maxPrice = Math.max(...p.markets.map((m) => m.max));
  const avgPrice = Math.round(
    rows.reduce((sum, r) => sum + r.avg, 0) / rows.length
  );

  const diff = Math.abs(p.today - p.yesterday);
  const dir = p.change.dir;
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const color =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-gray-500";

  const changeText =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
      : dir === "down"
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`
      : "গতকালের তুলনায় দাম অপরিবর্তিত";

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex gap-2 flex-wrap">
        <Link href="/" className="hover:text-green-600">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:text-green-600">
          {p.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800">{p.nameBn}</span>
      </nav>

      {/* Top summary card */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div className="flex gap-4 items-start">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-5xl">
            {p.image}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">{p.nameBn}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {unitLabel(p.unit)} ·{" "}
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                {p.categoryNameBn}
              </span>
            </p>
            <p className="text-sm mt-2">{changeText}</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl px-8 py-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-4xl font-extrabold">{toBn(p.today)}</p>
          <p className="text-sm text-gray-500">
            টাকা / {unitLabel(p.unit).replace("প্রতি ", "")}
          </p>
          <p className={`text-sm font-semibold mt-1 ${color}`}>
            {arrow} {pctBn(p.change.pct)}%
          </p>
        </div>
      </section>

      {/* Price summary */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600">
              {toBn(minPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600">
              {toBn(maxPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-2xl font-bold text-green-600">
              {toBn(avgPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">
              {unitLabel(p.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Market table */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-3 pr-4">বাজার</th>
                <th className="py-3 pr-4">বিভাগ</th>
                <th className="py-3 pr-4 text-right">সর্বনিম্ন</th>
                <th className="py-3 pr-4 text-right">সর্বাধিক</th>
                <th className="py-3 text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr
                  key={m.market}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-3 pr-4">{m.market}</td>
                  <td className="py-3 pr-4">{m.division}</td>
                  <td className="py-3 pr-4 text-right">{priceBn(m.min)} টাকা</td>
                  <td className="py-3 pr-4 text-right">{priceBn(m.max)} টাকা</td>
                  <td className="py-3 text-right font-bold">
                    {priceBn(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}