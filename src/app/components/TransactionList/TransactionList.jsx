"use client";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getTransactionsPaginated } from "@/app/actions/transactions";
import { Transaction } from "../Transaction/Transaction";
import { useState } from "react";
import { TransactionFilter } from "../TransactionsFilter/TransactionsFilter";
import { useTransactionFilter } from "@/app/hooks/useTransasctionFilter";
import { Pagination } from "../Pagination/Pagination";
export const TransactionList = () => {
  const {query, category, sort} = useTransactionFilter();
  
  const [page, setPage] = useState(0);
  const {
    data: transactions,
    isLoading,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["transactions", page, query, category, sort],
    queryFn: () => getTransactionsPaginated(page, query, category, sort),
    placeholderData: keepPreviousData,
  });
  const totalNumberofPages = [...Array(transactions?.totalPages).keys()];
  
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <section className="bg-white my-6 p-8 max-[600px]:p-6 rounded-xl w-full ">
      
      <TransactionFilter shouldIncludeFilter={true} setPage={setPage}/>
      
      <div className=" justify-between text-center preset-4 text-(--gray-500) border-b-1 border-(--gray-100) pb-4 grid grid-cols-4 gap-4 max-[600px]:hidden">
        <p>Recipient/Sender</p>
        <p>Category</p>
        <p>Transaction Date</p>
        <p>Amount</p>
      </div>

      {transactions.transactions.map((transaction) => {
        return (
          <Transaction
            key={transaction._id}
            src={transaction.avatar}
            name={transaction.name}
            category={transaction.category}
            amount={transaction.amount}
            date={transaction.date}
          />
        );
      })}
      <Pagination transactions={transactions} page={page} setPage={setPage} totalNumberofPages={totalNumberofPages} isPlaceholderData={isPlaceholderData}/>
    </section>
  );
};
