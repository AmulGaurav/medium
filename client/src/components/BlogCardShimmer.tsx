import { Skeleton } from "./ui/skeleton";

function BlogCardShimmer() {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 py-7">
      <div className="flex items-center gap-1 md:gap-1.5">
        <Skeleton className="h-6 w-6 rounded-full" />

        <Skeleton className="h-5 w-16 md:w-20 rounded-full" />

        <Skeleton className="h-1 w-1 rounded-full" />

        <Skeleton className="h-5 w-20 md:w-24 rounded-full" />
      </div>

      <div className="py-4 space-y-2">
        <Skeleton className="h-4 w-64 md:w-80" />
        <Skeleton className="h-4 w-80 md:w-96" />
      </div>

      <Skeleton className="h-4 w-28 md:w-32" />
    </div>
  );
}

export default BlogCardShimmer;
