export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="skeleton h-56 w-full rounded-3xl"></div>
      <div className="skeleton h-6 w-48"></div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="skeleton h-36 rounded-2xl"></div>
        ))}
      </div>
    </main>
  );
}
