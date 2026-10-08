import { todayBn } from "@/lib/format";

export default function Hero() {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 flex flex-col-reverse md:flex-row items-center gap-6">
      <div className="flex-1">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          {todayBn()}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="text-gray-600 mt-3 max-w-xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn btn-success text-white mt-6"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <img
        src="/images/bazar-hero.png"
        alt="বাজারের সবজির ঝুড়ি"
        className="w-48 sm:w-64 md:w-72"
      />
    </section>
  );
}