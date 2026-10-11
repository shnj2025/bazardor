import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?protected=1");

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <UpdateNameForm currentName={session.user.name} />

      <Link href="/profile" className="text-sm text-gray-500">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </main>
  );
}