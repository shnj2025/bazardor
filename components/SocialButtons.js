"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  async function handleSocial(provider) {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "লগইন করা যায়নি");
  }

  return (
    <div>
      <div className="divider text-xs text-gray-500">অথবা</div>
      <button
        type="button"
        onClick={() => handleSocial("github")}
        className="btn btn-outline w-full"
      >
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}