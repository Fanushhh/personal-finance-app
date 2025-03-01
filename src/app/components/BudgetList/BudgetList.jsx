


import { getBugets } from "@/app/actions/bugets";

import { Budget } from "../Budget/Budget";
import { getAllTransactions } from "@/app/actions/transactions";
export default async function BudgetList() {
  
  const budgets = await getBugets();
  const transactions = await getAllTransactions();

  

  return (
    <div className="flex p-0 w-full flex-wrap gap-6 ">
      
        {budgets.map((budget) => {
          
          const filteredTransactions = transactions?.filter(transaction => transaction.category === budget.budgetCategory)
          return (<Budget
            transactions={filteredTransactions}
            key={budget.id}
            id={budget.id}
            category={budget.budgetCategory}
            maxSpend={budget.maxSpend}
            colorPref={budget.colorPref}
          />)
        })}
      
    </div>
  );
}
