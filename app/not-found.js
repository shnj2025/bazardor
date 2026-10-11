import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="text-5xl font-extrabold mt-4">৪০৪</h1>
      <p className="text-xl font-semibold mt-2">পেজটি খুঁজে পাওয়া যায়নি</p>
      <p className="text-gray-500 mt-2">
        আপনি যে ঠিকানাটি খুঁজছেন সেটি সঠিক নয় অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link href="/" className="btn btn-success text-white mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}