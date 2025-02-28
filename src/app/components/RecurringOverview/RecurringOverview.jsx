import { getRecurringTransactions } from "@/app/actions/transactions"
import calculateDueBills from "../RecurringSummary/calculateBills";
import Image from "next/image";
import Link from "next/link";

export const RecurringOverview = async () => {
    const bills = await getRecurringTransactions();
    const {
        dueSoonAmount,
        upcomingAmount,
        paidAmount,
      } = calculateDueBills(bills);

    
    return(
<section className="bg-white rounded-xl mt-6 p-6">
<div className="flex w-full justify-between mb-5 ">
                <h2 className="preset-2">Recurring bills</h2>
                <Link className="text-(--gray-500)" href="/pots">See Details <Image src="/assets/images/icon-caret-right.svg" className="ml-1 inline-block!" width={5} height={5} alt="caret right icon" /></Link>
            </div>
            <div className="*:flex *:justify-between *:my-3 *:bg-(--beige-100) *:border-l-3 *:w-full *:px-4 *:py-5 *:rounded-xl">
                <div className=" border-(--green)">
                    <p>Paid bills</p>
                    <p>${Math.abs(paidAmount)}</p>
                </div>
                <div className="border-(--yellow)">
                    <p>Total upcoming</p>
                    <p>${Math.abs(upcomingAmount)}</p>
                </div>
                <div className="border-(--blue)">
                    <p>Due soon</p>
                    <p>${Math.abs(dueSoonAmount)}</p>
                </div>
                
            </div>
</section>
    )
}