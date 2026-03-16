export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar skeleton */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="w-4/5 mx-auto mt-6">
          <div className="bg-base-950 border border-accent/20 rounded-2xl h-20 px-8 flex items-center justify-between animate-pulse">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="flex gap-8">
              <div className="h-4 w-16 rounded bg-white/10" />
              <div className="h-4 w-16 rounded bg-white/10" />
              <div className="h-4 w-16 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav skeleton */}
      <div className="fixed top-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full bg-base-950 border border-accent/20 animate-pulse" />

      {/* Hero skeleton */}
      <div className="h-screen flex items-center px-4 lg:w-4/5 lg:mx-auto lg:p-8 animate-pulse">
        <div className="space-y-6 w-full max-w-2xl">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="space-y-3">
            <div className="h-10 w-3/4 rounded bg-white/10" />
            <div className="h-10 w-1/2 rounded bg-white/10" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
            <div className="h-4 w-4/6 rounded bg-white/10" />
          </div>
          <div className="flex gap-4 pt-2">
            <div className="h-10 w-28 rounded-lg bg-white/10" />
            <div className="h-10 w-28 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
