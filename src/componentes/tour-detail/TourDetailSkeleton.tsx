export default function TourDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 h-64 w-full animate-pulse rounded-2xl bg-slate-200" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
