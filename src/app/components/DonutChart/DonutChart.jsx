"use client";

import { getBugets } from "@/app/actions/bugets";
import { getAllTransactions } from "@/app/actions/transactions";
import { useQuery } from "@tanstack/react-query";

export const DonutChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBugets,
  });
  const {
    data: transactions,
    isLoading: areTransactionsLoading,
    isError: isTransactionError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });
  console.log(transactions);
  const totalTransactionsAmount = transactions?
    .reduce((acc, nextVal) => acc + nextVal.amount, 0)
    .toFixed(2);
  console.log(totalTransactionsAmount);
  if (areTransactionsLoading) return <p>Loading transactions...</p>;
  if (isTransactionError) return <p>Error loading transactions</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading budgets</p>;

  const totalAmount = data?.reduce(
    (acc, budget) => acc + Number(budget.maxSpend),
    0
  );

  const radius = 80; // Controls the size of the donut
  const thickness = 30; // Stroke thickness
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <figure className="flex max-[600px]:flex-col p-6 lg:flex-col gap-8 lg:max-w-[400px] items-center max-[1000px]:justify-evenly">
      {/* SVG Donut Chart */}
      <svg
        viewBox="0 0 200 200"
        className="lg:mx-auto my-10 w-[240px] h-[240px] "
      >
        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth={thickness}
        />

        {/* Dynamic Budget Segments */}
        {data?.map((budget, index) => {
          const percentage = Number(budget.maxSpend) / totalAmount;
          const strokeDasharray = `${
            percentage * circumference
          } ${circumference}`;
          const strokeDashoffset = -accumulatedPercentage * circumference;
          accumulatedPercentage += percentage; // Move to next segment

          return (
            <circle
              key={budget._id}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={`var(--${budget.colorPref})`}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              transform="rotate(-90 100 100)" // Start from top
            />
          );
        })}

        {/* Centered Total Amount */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
        >
          <tspan  x="100" dy="">
            ${totalTransactionsAmount} 
          </tspan>
          <tspan fill="var(--beige-500)" fontWeight={400} fontSize={14} x="100" dy="1.5rem">
          of ${totalAmount} limit
          </tspan>
        </text>
      </svg>

      {/* Legend */}
      <figcaption className="w-full flex flex-col gap-4 mt-4 ">
        <p className="preset-2">Spending summary</p>
        {data?.map((budget) => (
          <div
            key={budget._id}
            className="preset-4 flex justify-between w-full"
          >
            <div className="relative flex items-center gap-2">
              <span
                className="inline-block w-1 h-4 rounded-2xl"
                style={{ backgroundColor: `var(--${budget.colorPref})` }}
              ></span>
              <p>{budget.budgetCategory}</p>
            </div>
            <span>${budget.maxSpend}</span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
};
