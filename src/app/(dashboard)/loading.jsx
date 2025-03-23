import Skeleton from "../components/LoadingSkeleton/LoadingSkeleton";
import SkeletonText from "../components/LoadingSkeleton/LoadingTextSkeleton";

export default function Loading() {
    
    return (<main role="main" className="flex w-full flex-col px-4 py-6 md:p-10 max-[600px]:mb-10 bg-(--beige-100) ">
          <SkeletonText classNames="text-4xl p-6 w-full bg-(--beige-100)"/>
          
          <div className="grid xl:grid-cols-12 grid-cols-1 gap-6 max-w-[1000px] mt-6">
            <Skeleton classNames=" col-span-7"/>
            <Skeleton classNames=" col-span-5"/>
          </div>
        </main>)
  }
