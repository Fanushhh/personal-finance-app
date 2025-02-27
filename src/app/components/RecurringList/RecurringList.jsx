"use client";

import Image from "next/image";
import { TransactionFilter } from "../TransactionsFilter/TransactionsFilter";

export const RecurringList = ({transactions, isLoading, isError}) => {
  
  return (
    <section className=" p-8 preset-4 text-(--gray-500) bg-white  w-full">
      <TransactionFilter shouldIncludeFilter={false} />
        <div className="grid grid-cols-3 pb-4 border-b-2 border-(--gray-500-border) max-[768px]:hidden">
            <p>Bill Title</p>
            <p className="place-self-end">Due Date</p>
            <p className="place-self-end">Amount</p>
        </div>
      <div className="">
          {transactions.map((bill) => {
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
    </section>
  );
};
