"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) return toast.error("ইমেইল লিখুন");
    if (!password) return toast.error("পাসওয়ার্ড লিখুন");

    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-6 space-y-4"
      >
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
            placeholder="আপনার পাসওয়ার্ড"
            required
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success text-white w-full"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
                    <SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-600 font-medium">
            সাইন আপ করুন
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