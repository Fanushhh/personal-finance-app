"use client";
import { createBudget } from "@/app/actions/bugets";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBugets } from "@/app/actions/bugets";
import React, { useActionState } from "react";
const options = [
  { value: "", label: "Select a color" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "cyan", label: "Cyan" },
  { value: "navy", label: "Navy" },
  { value: "red", label: "Red" },
  { value: "purple", label: "Purple" },
  { value: "turquoise", label: "Turquoise" },
  { value: "blue", label: "Blue" },
  { value: "orange", label: "Orange" },
];
const categories = [
  { value: "", label: "Select a category" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Bills", label: "Bills" },
  { value: "Groceries", label: "Groceries" },
  { value: "Dining Out", label: "Dining Out" },
  { value: "Transportation", label: "Transportation" },
  { value: "Personal Care", label: "Personal Care" },
  { value: "Education", label: "Education" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Shopping", label: "Shopping" },
  { value: "General", label: "General" },
];

export const BudgetForm = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const [message, formAction] = useActionState(createBudget, undefined);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBugets,
  });

  // Showing only colors available
  const updatedColors = options.filter((option) => {
    return !data?.some((budget) => budget.colorPref === option.value);
  });
  // Showing only categories available
  const updatedCategories = categories.filter((option) => {
    return !data?.some((budget) => budget.budgetCategory === option.value);
  });

  React.useEffect(() => {
    if (message?.success) {
      queryClient.invalidateQueries("budgets");
      closeModal();
    }
  }, [message, closeModal, queryClient]);
  

  return (
    <div className="relative flex-col rounded-xl gap-4 bg-white p-6  shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div className="max-w-[500px]">
          <h1 className="preset-1 mb-4">Add New Buget</h1>
          <p className="preset-4 text-[var(--beige-500)]">
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </p>
        </div>
      </div>

      <form action={formAction} className="*:flex *:flex-col ">
        <div>
          <label htmlFor="budgetCategory">Budget Category</label>
          <select
          key={message?.budgetCategory}
            name="budgetCategory"
            id="budgetCategory"
            defaultValue={message?.budgetCategory}
            className="px-6 relative"
          >
            {updatedCategories.map((option) => {
              return (
                <option key={crypto.randomUUID()} defaultValue={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
          {!message?.success && (
            <p className="text-red-500">{message?.message.budgetCategory}</p>
          )}
        </div>

        <div>
          <label htmlFor="maxSpend">Maximum Spend</label>
          <input
            placeholder="$ e.g. 2000"
            type="text"
            id="maxSpend"
            defaultValue={message?.maxSpend}
            name="maxSpend"
            autoComplete="off"
          />
          {!message?.success && (
            <p className="text-red-500">{message?.message.maxSpend}</p>
          )}
        </div>

        <div className="">
          <label htmlFor="colorPref">Theme</label>
          <select
            name="colorPref"
            id="colorPref"
            key={message?.colorPref}
            defaultValue={message?.colorPref}
            className="px-6 relative"
          >
            {updatedColors.map((option) => {
              return (
                <option
                  style={{ color: `var(--${option.value}` }}
                  key={crypto.randomUUID()}
                  value={option.value}
                >
                  {option.label}
                </option>
              );
            })}
          </select>
          {!message?.success && (
            <p className="text-red-500">{message?.message.colorPref}</p>
          )}
        </div>

        <button type="submit">Add Budget</button>
      </form>
    </div>
  );
};
