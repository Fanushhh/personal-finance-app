import Skeleton from "@/app/components/LoadingSkeleton/LoadingSkeleton";
import SkeletonText from "@/app/components/LoadingSkeleton/LoadingTextSkeleton";

export default function Loading() {
  return (
    <div className="text-4xl p-6 w-full bg-(--beige-100)">
      <SkeletonText></SkeletonText>

      <div>
        <Skeleton />
      </div>
    </div>
  );
}
