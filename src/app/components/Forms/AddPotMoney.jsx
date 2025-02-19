

export const AddPotMoney = ({ potName,currentAmount,target,progressWidth, potId, closeModal }) => {
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
                    <div className="relative w-full bg-(--beige-100) rounded-lg">
                        <div className="absolute"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <p>{progressWidth}%</p>
                    <p>Target of ${target}</p>
                </div>
            </div>
            <form action="">
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="addedAmount">Amount to add</label>
                    <input className="pl-8! relative" type="text"/>
                    <span className="absolute left-4 top-[54px] text-(--gray-500)">$</span>
                </div>
                <button type="submit">Confirm addition</button>
            </form>
        </div>
    )

}