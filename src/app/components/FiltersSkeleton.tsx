export function FiltersSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-1">
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="w-full lg:w-80 h-10 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-1">
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="w-full lg:w-80 h-10 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
      <div className="w-40 h-10 bg-gray-200 animate-pulse rounded lg:block hidden" />
    </div>
  );
}
