import { getBugets } from "@/app/actions/bugets";
import { getAllTransactions } from "@/app/actions/transactions";
import Link from "next/link";
import Image from "next/image";
export const DonutChartOverview = async () => {
  const budgets = await getBugets();
  const transactions = await getAllTransactions();
  const totalAmount = budgets.reduce(
    (acc, budget) => acc + Number(budget.maxSpend),
    0
  );
  const totalTransactionsAmount = Math.abs(
    transactions?.reduce((acc, nextVal) => {
      const hardCodedTransactionMonth = new Date(
        "2024-08-19T00:00:00Z"
      ).getUTCMonth();
      const transactionDate = new Date(nextVal.date).getUTCMonth();
      if (hardCodedTransactionMonth === transactionDate) {
        return acc + nextVal.amount;
      }
      return acc;
    }, 0)
  );
  const radius = 80; // Controls the size of the donut
  const thickness = 30; // Stroke thickness
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <section className="bg-white p-6 rounded-xl">
      <div className="flex w-full justify-between mb-5 ">
        <h2 className="preset-2">Pots</h2>
        <Link className="text-(--gray-500)" href="/budgets">
          See Details{" "}
          <Image
            src="/assets/images/icon-caret-right.svg"
            className="ml-1 inline-block!"
            width={5}
            height={5}
            alt="caret right icon"
          />
        </Link>
      </div>
      <figure className="flex h-fit gap-8 justify-center items-center">
        {/* SVG Donut Chart */}
        <svg viewBox="0 0 200 200" className="lg:mx-auto w-[240px] h-[240px]">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth={thickness}
          />

          {/* Dynamic Budget Segments */}
          {budgets.map((budget) => {
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
            fontSize="18"
            fontWeight="bold"
          >
            <tspan x="100" dy="">
              ${totalTransactionsAmount}
            </tspan>
            <tspan
              fill="var(--beige-500)"
              fontWeight={400}
              fontSize={12}
              x="100"
              dy="18"
            >
              of ${totalAmount} limit
            </tspan>
          </text>
        </svg>

        {/* Legend */}
        <figcaption className="w-full max-w-[100px] flex flex-col gap-4 mt-4 ">
          {budgets.map((budget, index) => {
            if (index >= 4) {
              return;
            }
            return (
              <div
                key={budget._id}
                className=" pl-3 relative flex flex-col justify-between w-full "
              >
                <span
                  className="absolute left-0 w-1 h-full rounded-2xl"
                  style={{ backgroundColor: `var(--${budget.colorPref})` }}
                ></span>

                <div>
                  <p className="preset-5 text-(--gray-500)">
                    {budget.budgetCategory}
                  </p>
                  <span className="preset-4-bold">${budget.maxSpend}</span>
                </div>
              </div>
            );
          })}
        </figcaption>
      </figure>
    </section>
  );
};
