

import { BudgetHeader } from "@/app/components/BugetHeader/BudgetHeader";
import BudgetList from "@/app/components/BudgetList/BudgetList";
import { DonutChart } from "@/app/components/DonutChart/DonutChart";


export default async function Page() {
  
  

  return (
    
      <div className=" flex w-full flex-col p-6">
        <BudgetHeader />
        <div>
          <DonutChart />
          <BudgetList />
        </div>
      </div>
      
    
  );
}
