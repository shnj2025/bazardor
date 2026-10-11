import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?protected=1");

  const user = session.user;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <span className="w-16 h-16 rounded-xl bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500 break-all">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-5">
        <h2 className="font-bold mb-3">তথ্য</h2>
        <p className="text-sm text-gray-500">নাম</p>
        <p className="mb-4">{user.name}</p>

        <Link href="/profile/update" className="btn btn-success text-white w-full">
          আপডেট
        </Link>
      </section>
    </main>
  );
}