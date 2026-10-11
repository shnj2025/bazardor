"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RedirectToast() {
  const params = useSearchParams();
  const isProtected = params.get("protected");

  useEffect(() => {
    if (isProtected) {
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [isProtected]);

  return null;
}