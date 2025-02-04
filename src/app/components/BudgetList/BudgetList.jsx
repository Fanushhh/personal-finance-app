"use client"; // Needed for hooks in Next.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBugets, deleteBudget } from "@/app/actions/bugets";

import { useRef } from "react";
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

  if (isLoading) return <p>Loading budgets...</p>;
  if (error) return <p>Error loading budgets</p>;

  return (
    <div className="flex p-6">
      <div>
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
    </div>
  );
}
