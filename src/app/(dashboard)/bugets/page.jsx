
import { getBugets } from "@/app/actions/bugets";
import { BudgetHeader } from "@/app/components/BugetHeader/BudgetHeader";
import { deleteBudget } from "@/app/actions/bugets";
import BudgetList from "@/app/components/BudgetList/BudgetList";


export default async function Page() {
  const bugets = await getBugets();
  

  return (
    
      <div className=" flex p-6">
        <BudgetHeader />
        <BudgetList />
      </div>
      
    
  );
}
