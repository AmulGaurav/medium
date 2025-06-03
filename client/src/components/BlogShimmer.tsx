import { Skeleton } from "./ui/skeleton";

function BlogShimmer() {
  return (
    <div className="grid grid-cols-12 gap-8 px-4">
      <div className="col-span-12 md:col-span-7 order-2 md:order-1 space-y-2.5 mx-auto">
        <Skeleton className="h-9 md:h-11 w-96 rounded-full" />

        <Skeleton className="h-6 w-52 rounded-full mt-4" />

        <Skeleton className="h-5 w-96 rounded-full mt-6" />
        <Skeleton className="h-5 w-96 rounded-full" />
        <Skeleton className="h-5 w-96 rounded-full" />
      </div>

      <div className="col-span-12 md:col-span-5 order-1 md:order-2 space-y-4">
        <Skeleton className="h-5 md:h-6 w-16 md:w-20 rounded-full" />

        <div className="flex items-center gap-2 md:gap-3">
          <div>
            <Skeleton className="h-7 w-7 rounded-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 sm:h-6 w-32 rounded-full" />

            <Skeleton className="h-4 md:h-5 w-80 rounded-full" />
            <Skeleton className="h-4 md:h-5 w-80 rounded-full" />
            <Skeleton className="h-4 md:h-5 w-80 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogShimmer;
