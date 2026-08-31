export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-900">
      <div className="text-center">
        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-secondary-500" />

        <h2 className="font-display text-2xl font-semibold text-white">
          Pawnest
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Loading...
        </p>
      </div>
    </div>
  );
}