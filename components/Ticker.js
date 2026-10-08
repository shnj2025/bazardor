import { getProducts } from "@/lib/api";
import { toBn, unitLabel } from "@/lib/format";

function TickerItem({ p }) {
  const dir = p.change.dir;
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const color =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-gray-500";

  // "প্রতি কেজি" -> "কেজি"
  const unit = unitLabel(p.unit).replace("প্রতি ", "");

  return (
    <div className="flex items-center gap-2 px-4 whitespace-nowrap text-sm border-r border-gray-100">
      <span>{p.image}</span>
      <span className="font-semibold">{p.nameBn}</span>
      <span className="text-gray-600">
        {toBn(p.today)} টাকা/{unit}
      </span>
      <span className={`font-bold ${color}`}>
        {arrow} {toBn(Math.abs(p.change.pct))}%
      </span>
    </div>
  );
}

export default async function Ticker() {
  const products = await getProducts();

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden py-2">
      <div className="marquee-track">
        {products.map((p) => (
          <TickerItem key={`a-${p.id}`} p={p} />
        ))}
        {products.map((p) => (
          <TickerItem key={`b-${p.id}`} p={p} />
        ))}
      </div>
    </div>
  );
}