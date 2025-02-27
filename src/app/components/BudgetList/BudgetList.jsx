"use client"; // Needed for hooks in Next.js

import { useQuery } from "@tanstack/react-query";
import { getBugets } from "@/app/actions/bugets";

import { Budget } from "../Budget/Budget";
import { getAllTransactions } from "@/app/actions/transactions";
export default function BudgetList() {
  // Fetch budgets using useQuery
  const {
    data: budgets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBugets,
  });
  const {
    data: transactions,
    isLoading: areTransactionsLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,

  })

  if (isLoading) return <p>Loading budgets...</p>;
  if (error) return <p>Error loading budgets</p>;
  if (areTransactionsLoading) return <p>loading transactions...</p>;
  if (transactionError) return <p>Error loading transactions</p>;

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
