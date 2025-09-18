import Skeleton from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="px-4 pt-10 md:px-32 lg:pt-20">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-12 w-3/4 rounded-md" />
          <Skeleton className="h-12 w-1/3 rounded-md" />

          <div className="mt-6">
            <Skeleton className="mb-7 h-6 w-32 rounded-md" />
            <Skeleton className="h-10 w-48 rounded-md" />
          </div>

          <div className="mt-6">
            <Skeleton className="mb-7 h-6 w-32 rounded-md" />
            <Skeleton className="h-10 w-48 rounded-md" />
          </div>
        </div>

        <Skeleton className="h-92 w-full rounded-md xl:max-w-[608px]" />
      </div>
      <Skeleton className="my-10 h-32" />
    </div>
  );
}
