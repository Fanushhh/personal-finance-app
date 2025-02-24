"use client";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getTransactions } from "@/app/actions/transactions";
import { Transaction } from "../Transaction/Transaction";
import { useState } from "react";
import { TransactionFilter } from "../TransactionsFilter/TransactionsFilter";
import { useTransactionFilter } from "@/app/hooks/useTransasctionFilter";
import { Suspense } from "react";
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
    queryFn: () => getTransactions(page, query, category, sort),
    placeholderData: keepPreviousData,
  });
  const totalNumberofPages = [...Array(transactions?.totalPages).keys()];
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <section className="bg-white my-6 p-8 max-[600px]:p-6 rounded-xl w-full ">
      <Suspense fallback={<>Loading</>}>
      <TransactionFilter setPage={setPage}/>
      </Suspense>
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
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            setPage(page - 1);
            
          }}
          disabled={page === 0}
        >
          Previous
        </button>
        <div className="flex gap-3">
            {totalNumberofPages.map((_, i) => {
                return (
                    <button
                    key={i}
                    onClick={() => {
                        setPage(i);
            
                    }}
                    disabled={page === i}
                    >
                    {i + 1}
                    </button>
                );
            })}
        </div>
        <button
          onClick={() => {
            if (!isPlaceholderData && transactions.hasMore) {
              setPage(old => old + 1);
              
            }
          }}
          disabled={isPlaceholderData || !transactions?.hasMore}
        >
          Next
        </button>
      </div>
    </section>
  );
};

const filterTransactions = (transactions, query, sort, category) => {
  if(query === "" || sort === "" || category === ""){
    return transactions;
  }
  const filteredTransactions = transactions.filter(transaction => transaction.name.includes(query))
  // switch(sort){
  //   case "oldest":
  //     filteredTransactions.sort((a,b) => a.date < b.date)
  //     break;
  //   case "a to z":
  //     filteredTransactions.sort((a,b) => a.name > b.name)
  //     break;
  //   case "b to a":
  //     filteredTransactions.sort((a,b) => a.name < b.name)
  //     break;
  //   case "highest":
  //     filteredTransactions.sort((a,b) => a.amount > b.amount)
  //     break;
  //   case "lowest":
  //     filteredTransactions.sort((a,b) => a.amount < b.amount)
  //     break;
  //   default:
  //     filteredTransactions.sort((a,b) => a.date > b.date)
  //     break;

  // }
  // if(category !== ""){
  //   filteredTransactions.filter((transaction) => transaction.category === category);
  // }
  console.log(filteredTransactions)
  return filteredTransactions;

}
