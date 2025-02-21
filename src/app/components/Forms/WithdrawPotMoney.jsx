import { useState,useActionState, useEffect } from "react";
import { withdrawPotMoney } from "@/app/actions/pots";
import { useQueryClient } from "@tanstack/react-query";

export const WithdrawPotMoney = ({ potName,currentAmount,target,progressWidth, potId, closeModal }) => {
    const [message, formAction] = useActionState(withdrawPotMoney, undefined);
    const queryClient = useQueryClient();
    const [withdrawnAmount, setWithdrawnAmount] = useState(0);
    const isBiggerThanTarget = withdrawnAmount > currentAmount;
    const deductedprocentage = (withdrawnAmount / currentAmount) * 100;
    
    useEffect(() => {
        if(message?.success){
            queryClient.invalidateQueries("pots");
            closeModal();
        }
    },[message, closeModal, queryClient])
    
    
    return(
        <div className="p-8">
            <h2 className="preset-1 mb-5">Withdraw from {`'${potName}'`}</h2>
            <p className="preset-4 text-(--gray-500)">Here you can withdraw some spending money for any urgent needs you might have. Try and avoid doing this in order to save more money.</p>
            <div className="py-5">
                <div className="flex justify-between items-center my-4">
                    <p className="preset-4">New amount</p>
                    <p className="preset-1">${currentAmount}</p>
                </div>
                <div>
                    <div className="relative w-full bg-(--beige-100) rounded-lg h-2">
                        <div style={{width:`${progressWidth > 100 ? 100 : progressWidth}%`}} className="absolute bg-(--gray-900) h-2 rounded-lg">
                        <div style={{width:`${deductedprocentage > 100 ? 100 : deductedprocentage}%`, right: "0%", borderLeft:'2px solid var(--white)'}} className={`absolute bg-(--red) h-2 rounded-r-lg`}></div>
                        </div>
                        
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
                    <label htmlFor="deductedAmount">Amount to withdraw</label>
                    <input name="deductedAmount" onChange={(e) => setWithdrawnAmount(Number(e.target.value))} value={withdrawnAmount > currentAmount ? currentAmount : withdrawnAmount} className="pl-8! relative" type="number"/>
                    <span className="absolute left-4 top-[54px] text-(--gray-500)">$</span>
                </div>
                <button type="submit">Confirm withdrawal</button>
            </form>
        </div>
    )

}