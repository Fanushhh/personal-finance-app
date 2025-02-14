"use client";

import { getBugets } from "@/app/actions/bugets";
import { useQuery } from "@tanstack/react-query";

export const DonutChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBugets,
  });

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
    <figure className="flex flex-col max-w-[400px]">
      {/* SVG Donut Chart */}
      <svg width="300" height="300" viewBox="0 0 200 200" className="mx-auto mb-10">
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
          const strokeDasharray = `${percentage * circumference} ${circumference}`;
          const strokeDashoffset = -accumulatedPercentage * circumference;
          accumulatedPercentage += percentage; // Move to next segment

          return (
            <circle
              key={budget._id}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={budget.colorPref}
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
          dy=".3em"
          fontSize="20"
          fontWeight="bold"
        >
          ${totalAmount}
        </text>
      </svg>

      {/* Legend */}
      <figcaption className="flex flex-col gap-4 mt-4 ">
        <p className="preset-2">Spending summary</p>
        {data?.map((budget) => (
          <span
            key={budget._id}
            className="relative flex items-center gap-2"
          >
            <span
              className="w-1 h-4 rounded-2xl"
              style={{ backgroundColor: budget.colorPref }}
            ></span>
            {budget.budgetCategory}
          </span>
        ))}
      </figcaption>
    </figure>
  );
};