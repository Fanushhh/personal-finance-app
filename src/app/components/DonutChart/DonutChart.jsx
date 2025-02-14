"use client";

import { getBugets } from "@/app/actions/bugets";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const DonutChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBugets,
  });
  const colors = data?.map((budget) => budget.colorPref);

  console.log(colors);
  const totalAmount = data?.reduce(
    (acc, budget) => acc + Number(budget.maxSpend),
    0
  );
  console.log(totalAmount);
  const budgetProcentages = data?.map((budget) => {
    return {
      procentage: Math.round((Number(budget.maxSpend) / totalAmount) * 100),
      color: budget.colorPref,
    };
  });
  budgetProcentages?.sort((a, b) => b - a);
  let conicGradient = "";
  let currentPercentage = 0; // Track accumulated percentage

  budgetProcentages?.forEach((budget, index) => {
    const nextPercentage = currentPercentage + budget.procentage;

    if (index === budgetProcentages.length - 1) {
      // Last item, no comma at the end
      conicGradient += `var(--${budget.color}) ${currentPercentage}% ${nextPercentage}%`;
    } else {
      conicGradient += `var(--${budget.color}) ${currentPercentage}% ${nextPercentage}%,`;
    }

    currentPercentage = nextPercentage;
  });
  console.log(conicGradient);

  const gradientStyles = {
    background: `radial-gradient(var(--white) 45%,transparent 0% 70%, var(--white) 70% 100%),conic-gradient(from 30deg,${conicGradient})`,
  };
  console.log(gradientStyles);

  return (
    <figure className="flex flex-col justify-center max-w-full ">
      <div style={gradientStyles} className={`size-60 rounded-full}`}></div>

      <figcaption>Budgets</figcaption>
    </figure>
  );
};
