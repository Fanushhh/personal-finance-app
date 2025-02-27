"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { RecurringList } from "@/app/components/RecurringList/RecurringList";
import { getRecurringTransactions } from "@/app/actions/transactions";
import { useTransactionFilter } from "@/app/hooks/useTransasctionFilter";

import Image from "next/image";
export default function Page() {
  const {query,sort} = useTransactionFilter();
  const {
    data: recurringBills,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recurring-bills",query,sort],
    queryFn: () => getRecurringTransactions(query,sort),
    placeholderData: keepPreviousData,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error loading bills</p>;
  }
  if(!recurringBills){
    return <p>No data</p>
  }
  const {
    dueSoonAmount,
    upcomingAmount,
    paidAmount,
    dueLength,
    paidLength,
    upcomingLength,
  } = calculateDueBills(recurringBills);
  const totalBills = Math.abs(dueSoonAmount + upcomingAmount + paidAmount);

  return (
    <div className="text-4xl p-6 w-full bg-(--beige-100)">
      <h1 className="preset-1">Recurring Bills</h1>
      
      <div className="flex gap-8 my-8 max-[1000px]:flex-col">
      
        <div className="lg:w-[320px] max-w-full w-full text-(--gray-500)">
        
          <div className="bg-black text-white p-6 rounded-xl *:mb-3 ">
            <Image
              src="/assets/images/icon-recurring-bills.svg"
              width={50}
              height={50}
              alt="recurring bills image"
            />
            <div>
              <p className="preset-4">Total bills</p>
              <p className="preset-1">${totalBills}</p>
            </div>
          </div>
          <div className="preset-4 bg-white p-6 my-6 rounded-xl">
            <div className="flex w-full justify-between border-b-1 border-(--gray-500-border) py-2">
              <p>Paid bills</p>
              <span className="preset-4-bold text-black">
                {paidLength}(${Math.abs(paidAmount)})
              </span>
            </div>
            <div className="flex w-full justify-between border-b-1 border-(--gray-500-border) py-2">
              <p>Upcoming bills</p>
              <span className="preset-4-bold text-black">
                {upcomingLength}(${Math.abs(upcomingAmount)})
              </span>
            </div>
            <div className="flex w-full justify-between py-2 ">
              <p>Due soon</p>
              <span className="preset-4-bold text-(--red)">
                {dueLength}(${Math.abs(dueSoonAmount).toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        <RecurringList
          transactions={recurringBills}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}

function calculateDueBills(bills) {
  const latestTransactionDate = new Date("2024-08-19T00:00:00Z");
  const dueSoonThreshold = 5;

  const dueSoonPayments = bills.filter((t) => {
    const transactionDate = new Date(t.date).getUTCDate();

    return (
      t.recurring &&
      transactionDate >= latestTransactionDate.getUTCDate() &&
      transactionDate <= latestTransactionDate.getUTCDate() + dueSoonThreshold
    );
  });
  const paidBills = bills.filter((t) => {
    const transactionMonth = new Date(t.date).getUTCMonth();
    return (
      t.recurring && transactionMonth === latestTransactionDate.getUTCMonth()
    );
  });
  const upcomingBills = bills.filter((t) => {
    const transactionDate = new Date(t.date).getUTCDate();

    return (
      t.recurring &&
      transactionDate >= latestTransactionDate.getUTCDate() + dueSoonThreshold
    );
  });

  const dueSoonAmount = dueSoonPayments.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const upcomingAmount = upcomingBills.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const paidAmount = paidBills.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return {
    dueSoonAmount,
    upcomingAmount,
    paidAmount,
    paidLength: paidBills.length,
    upcomingLength: upcomingBills.length,
    dueLength: dueSoonPayments.length,
  };
}
