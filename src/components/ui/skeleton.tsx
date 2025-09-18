import { cn } from '@/lib/utils';

type SkeletonProps = React.JSX.IntrinsicElements['div'];

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-gray-100/90', className)} {...props} />
  );
}
