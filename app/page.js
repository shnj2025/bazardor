import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">বাজার দর</h1>
      <p className="my-2">মোট পণ্য: {products.length}</p>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.image} {p.nameBn} - {p.today} টাকা
          </li>
        ))}
      </ul>
    </main>
  );
}