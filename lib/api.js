const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}