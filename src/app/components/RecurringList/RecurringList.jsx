"use client";

import Image from "next/image";
import { TransactionFilter } from "../TransactionsFilter/TransactionsFilter";
import { useTransactionFilter } from "@/app/hooks/useTransasctionFilter";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRecurringTransactions } from "@/app/actions/transactions";
import { RecurringSummary } from "../RecurringSummary/RecurringSummary";

export const RecurringList = () => {
  const {query,sort} = useTransactionFilter(); // get URL parameters

  const {
    data: recurringBills,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recurring-bills",query,sort],
    queryFn: () => getRecurringTransactions(query,sort),
    placeholderData: keepPreviousData,
  });
   // fetch data with/without the URL params
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error loading bills</p>;
  }
  if(!recurringBills){
    return <p>No data</p>
  }
  return (
    <section className="flex gap-8 my-8 max-[1000px]:flex-col w-full">
       <RecurringSummary recurringBills={recurringBills}/>
    <div className=" p-8 preset-4 text-(--gray-500) bg-white rounded-xl h-fit  w-full">
      <TransactionFilter shouldIncludeFilter={false} />
        <div className="grid grid-cols-3 pb-4 border-b-2 border-(--gray-500-border) max-[768px]:hidden">
            <p>Bill Title</p>
            <p className="place-self-end">Due Date</p>
            <p className="place-self-end">Amount</p>
        </div>
      <div className="">
          {recurringBills.map((bill) => {
            const date = new Date(bill.date).getUTCDate();
            const dueDate = new Date("2024-08-19T00:00:00Z").getUTCDate();
            const isAlreadyPaid = dueDate > date;
            const isDueSoon = date > dueDate && date < dueDate + 5;
            return (
              <div key={crypto.randomUUID()} className="py-4 grid grid-cols-3 max-[768px]:grid-cols-1 items-center border-b-1 border-(--gray-500-border) last:border-none">
                <div className="flex flex-col gap-3 items-center">
                  <div className="w-full flex items-center gap-3">
                    <Image
                      src={bill.avatar.substr(1)}
                      width={40}
                      height={35}
                      className="rounded-full"
                      alt="bill icon"
                    />
                    <p className="preset-4-bold text-black">{bill.name}</p>
                  </div>
                  <div className=" justify-between w-full max-[768px]:flex hidden">
                  <p className="flex gap-2">Monthly {date} {isAlreadyPaid ? <Image src="/assets/images/icon-bill-paid.svg"width={15} height={15} alt="paid icon" />: isDueSoon ? <Image src="/assets/images/icon-bill-due.svg"width={15} height={15} alt="paid icon" /> : null}</p>
                    <p className="place-self-end">${Math.abs(bill.amount)}</p>
                  </div>
                </div>
                <div className="place-self-end max-[768px]:hidden">
                  <p className="flex gap-2">Monthly {date} {isAlreadyPaid ? <Image src="/assets/images/icon-bill-paid.svg"width={15} height={15} alt="paid icon" />: isDueSoon ? <Image src="/assets/images/icon-bill-due.svg"width={15} height={15} alt="paid icon" /> : null}</p>
                </div>
                <p className="place-self-end max-[768px]:hidden">${Math.abs(bill.amount)}</p>
              </div>
            );
          })}
      </div>
    </div>
    </section>
  );
};
