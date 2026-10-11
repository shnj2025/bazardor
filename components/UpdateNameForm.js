"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return toast.error("নাম লিখুন");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">নাম</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="input input-bordered w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-success text-white w-full"
      >
        {loading ? "অপেক্ষা করুন..." : "আপডেট"}
      </button>
    </form>
  );
}