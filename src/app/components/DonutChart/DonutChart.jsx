

import { getBugets } from "@/app/actions/bugets";
import { getAllTransactions } from "@/app/actions/transactions";
import { useQuery } from "@tanstack/react-query";

export const DonutChart = async () => {
  
  const budgets = await getBugets();
  const transactions = await getAllTransactions();
  const totalTransactionsAmount = Math.abs(transactions.reduce((acc, nextVal) => {
    const hardCodedTransactionMonth = new Date("2024-08-19T00:00:00Z").getUTCMonth();
    const transactionDate = new Date(nextVal.date).getUTCMonth();
    if(hardCodedTransactionMonth === transactionDate){
      return acc + nextVal.amount
    }
    return acc;
    }, 0));
  
  const totalAmount = budgets.reduce(
    (acc, budget) => acc + Number(budget.maxSpend),
    0
  );
  const totalByCategory = transactions.reduce((acc,currValue) => {
    const {category, amount, date} = currValue;
    const hardCodedTransactionMonth = new Date("2024-08-19T00:00:00Z").getUTCMonth();
    const transactionDate = new Date(date).getUTCMonth();
    if(hardCodedTransactionMonth === transactionDate){
       acc[category] = (acc[category] || 0) + amount;
    }
    
    return acc;
  },{});

  const radius = 80; // Controls the size of the donut
  const thickness = 25; // Stroke thickness
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <figure className="flex max-[600px]:flex-col rounded-xl h-fit bg-white lg:flex-col gap-8  p-6 items-center max-[1000px]:justify-evenly">
      {/* SVG Donut Chart */}
      <svg
        viewBox="0 0 200 200"
        className="lg:mx-auto my-10 max-w-full w-[320px]"
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
        {budgets.map((budget, index) => {
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
          <tspan x="100" dy="">
            ${totalTransactionsAmount} 
          </tspan>
          <tspan fill="var(--beige-500)" fontWeight={400} fontSize={14} x="100" dy="24">
          of ${totalAmount} limit
          </tspan>
        </text>
      </svg>

      {/* Legend */}
      <figcaption className="w-full flex flex-col gap-4 mt-4 ">
        <p className="preset-2">Spending summary</p>
        {budgets.map((budget) => (
          <div
            key={budget._id}
            className="preset-4 flex justify-between w-full text-(--gray-500)"
          >
            <div className="relative flex items-center gap-2 ">
              <span
                className="inline-block w-1 h-4 rounded-2xl"
                style={{ backgroundColor: `var(--${budget.colorPref})` }}
              ></span>
              <p>{budget.budgetCategory}</p>
            </div>
            <div>
              <span className="preset-4-bold text-black">${Math.abs(totalByCategory[budget.budgetCategory])} </span>
              <span>of ${budget.maxSpend}</span>
              </div>
          </div>
        ))}
      </figcaption>
    </figure>
  );
};
