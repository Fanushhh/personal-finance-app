

import { BudgetHeader } from "@/app/components/BugetHeader/BudgetHeader";
import BudgetList from "@/app/components/BudgetList/BudgetList";
import { DonutChart } from "@/app/components/DonutChart/DonutChart";
import Skeleton from "@/app/components/LoadingSkeleton/LoadingSkeleton";


export default async function Page() {
  
  

  return (
    
      <div className=" flex w-full flex-col px-4 py-6 md:p-10 max-[600px]:mb-10 bg-(--beige-100)">
        <BudgetHeader />
        <div className="flex gap-10 flex-col lg:flex-row mt-8">
          <DonutChart />
          <BudgetList />
        </div>
      </div>
      
    
  );
}
