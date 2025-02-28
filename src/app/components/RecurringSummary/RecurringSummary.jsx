
import calculateDueBills from "./calculateBills";
import Image from "next/image"
export const RecurringSummary = ({recurringBills}) =>{
const {
    dueSoonAmount,
    upcomingAmount,
    paidAmount,
    dueLength,
    paidLength,
    upcomingLength,
  } = calculateDueBills(recurringBills);
  const totalBills = Math.abs(dueSoonAmount + upcomingAmount + paidAmount);
    return(
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
    )
}

