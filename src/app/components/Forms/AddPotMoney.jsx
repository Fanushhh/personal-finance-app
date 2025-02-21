import { useState,useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addMoneyToPot } from "@/app/actions/pots";
export const AddPotMoney = ({ potName,currentAmount,target,progressWidth, potId, closeModal }) => {
    const [message, formAction] = useActionState(addMoneyToPot, undefined);
    const queryClient = useQueryClient();
    const [addedAmount, setAddedAmount] = useState(null);
    const remainingAmount = target - currentAmount;
    const isAlreadyFull = progressWidth >= 100;
    const isBiggerThanTotal = addedAmount > remainingAmount;
    const addedAmountProcentage = isAlreadyFull ? 0  : (addedAmount / target) * 100;
    console.log(addedAmountProcentage)
    useEffect(() => {
        if (message?.success) {
          queryClient.invalidateQueries("budgets");
          closeModal();
        }
      }, [message, closeModal, queryClient]);
    
    
    return(
        <div className="p-8">
            <h2 className="preset-1 mb-5">Add to {`'${potName}'`}</h2>
            <p className="preset-4 text-(--gray-500)">You can add more money to your pot when you get some change left. <br /> That way you can make sure your savings are on point.</p>
            <div className="py-5">
                <div className="flex justify-between items-center my-4">
                    <p className="preset-4">New amount</p>
                    <p className="preset-1">${currentAmount}</p>
                </div>
                <div>
                    <div className="relative w-full bg-(--beige-100) rounded-lg h-2">
                        <div style={{width:`${progressWidth > 100 ? 100 : progressWidth}%`}} className="absolute bg-(--gray-900) h-2 rounded-lg"></div>
                        <div style={{width:`${isAlreadyFull ? 0 : isBiggerThanTotal ? 100 - progressWidth : addedAmountProcentage}%`, left:`${isAlreadyFull ? 99 : progressWidth}%`, borderLeft: addedAmountProcentage === 0 ? '' : '2px solid var(--white)'}} className={`absolute bg-(--green) h-2 rounded-r-lg`}></div>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <p className="preset-4-bold">{progressWidth.toFixed(2)}%</p>
                    <p className="preset-5">Target of ${target}</p>
                </div>
            </div>
            <form action={formAction}>
            <input type="hidden" name="potId" value={potId} />
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="addedAmount">Amount to add</label>
                    <input step="any" name="addedAmount" onChange={(e) => setAddedAmount(Number(e.target.value))} defaultValue={addedAmount > currentAmount ? currentAmount : addedAmount} className="pl-8! relative" type="number"/>
                    <span className="absolute left-4 top-[54px] text-(--gray-500)">$</span>
                </div>
                <button type="submit">Confirm addition</button>
            </form>
        </div>
    )

}