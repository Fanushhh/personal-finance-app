

import { BudgetHeader } from "@/app/components/BugetHeader/BudgetHeader";
import BudgetList from "@/app/components/BudgetList/BudgetList";
import { DonutChart } from "@/app/components/DonutChart/DonutChart";


export default async function Page() {
  
  

  return (
    
      <div className=" flex w-full flex-col px-4 py-6 md:p-10 max-[600px]:mb-10">
        <BudgetHeader />
        <div className="flex gap-10 flex-col lg:flex-row">
          <DonutChart />
          <BudgetList />
        </div>
      </div>
      
    
  );
}
