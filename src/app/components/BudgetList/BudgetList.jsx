"use client"; // Needed for hooks in Next.js

import { useQuery } from "@tanstack/react-query";
import { getBugets } from "@/app/actions/bugets";

import { Budget } from "../Budget/Budget";
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
  console.log(budgets)

  if (isLoading) return <p>Loading budgets...</p>;
  if (error) return <p>Error loading budgets</p>;

  return (
    <div className="flex p-0 md:p-10 w-full flex-col gap-6">
      
        {budgets.map((budget) => (
          <Budget
            key={budget.id}
            id={budget.id}
            category={budget.budgetCategory}
            maxSpend={budget.maxSpend}
            colorPref={budget.colorPref}
          />
        ))}
      
    </div>
  );
}
