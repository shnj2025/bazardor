"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Check the form first
    if (!name.trim()) return toast.error("আপনার নাম লিখুন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm)
      return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="আবার লিখুন"
            required
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success text-white w-full"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <p className="text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-600 font-medium">
            সাইন ইন করুন
          </Link>
        </p>
      </form>

      <p className="text-center mt-6">
        <Link href="/" className="text-sm text-gray-500">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </main>
  );
}