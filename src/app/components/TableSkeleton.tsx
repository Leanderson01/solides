export function TableSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b text-sm">
                <th className="w-[48px] py-3 px-2 md:block hidden"></th>
                <th className="text-left py-3 px-4">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                </th>
                <th className="text-left py-3 px-4">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </th>
                <th className="text-left py-3 px-4">
                  <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
                </th>
                <th className="text-left py-3 px-4">
                  <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
                </th>
                <th className="text-left py-3 px-4">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                </th>
                <th className="text-left py-3 px-4">
                  <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
                </th>
                <th className="w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3 px-4 md:block hidden">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
                      <div className="flex flex-col gap-1">
                        <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-8 w-8 bg-gray-200 animate-pulse rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-4">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded hidden lg:block" />
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="h-10 w-full lg:w-20 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-full lg:w-20 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
