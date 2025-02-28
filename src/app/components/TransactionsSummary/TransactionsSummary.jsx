
import Link from "next/link"
import Image from "next/image"
import { getAllTransactions } from "@/app/actions/transactions"

export const TransactionsSummary = async() => {

    const transactions = await getAllTransactions(5);
    console.log(transactions)
    return(
        <section className=" bg-white p-8 rounded-xl mt-6">
            <div className="flex w-full justify-between mb-5 ">
                <h2 className="preset-2">Transactions</h2>
                <Link className="text-(--gray-500)" href="/transactions">See Details <Image src="/assets/images/icon-caret-right.svg" className="ml-1 inline-block!" width={5} height={5} alt="caret right icon" /></Link>
            </div>
            <div>
                {
                    transactions.map(transaction => {
                        const updatedAmount = transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`
                        return (<div key={transaction._id} className="flex justify-between py-2 border-b-1 border-(--gray-500-border) last:border-none">
                            <div className="flex gap-3 items-center py-2">
                                <Image src={transaction.avatar.substr(1)} className="rounded-full" width={35} height={35} alt="trx icon" />
                                <p className="preset-4-bold">{transaction.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="preset-4-bold" style={{color:transaction.amount > 0 ? "var(--green)" : ''}}>{updatedAmount}</p>
                                <p className="preset-4 text-(--gray-500)">{new Date(transaction.date).toLocaleDateString("en-GB", {day: "2-digit",month: "long", year: "numeric"})}</p>
                            </div>
                        </div>)
                    })
                }
            </div>
        </section>
    )
}