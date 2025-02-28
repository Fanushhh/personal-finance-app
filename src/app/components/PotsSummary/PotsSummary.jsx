
import { getPots } from "@/app/actions/pots"
import Link from "next/link";
import Image from "next/image";
export const PotsSummary = async() => {
    const pots = await getPots(4);
    const totalSavedAmount = Math.round(pots.reduce((acc, currPotValue) => acc + currPotValue.currentAmount,0));
    if(!pots){
        return(
            <div>
                <p>No pots created yet</p>
            </div>
        )
    }
    console.log(pots)
    return(
        <section className=" bg-white p-8 rounded-xl">
            <div className="flex w-full justify-between mb-5 ">
                <h2 className="preset-2">Pots</h2>
                <Link className="text-(--gray-500)" href="/pots">See Details <Image src="/assets/images/icon-caret-right.svg" className="ml-1 inline-block!" width={5} height={5} alt="caret right icon" /></Link>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex gap-4 bg-(--beige-100) p-6  rounded-xl w-full">
                    <Image src="/assets/images/icon-pot.svg" className="" width={35} height={35} alt="pots summary icon" />
                    <div  className="">
                        <p>Total saved</p>
                        <p className="preset-1">${totalSavedAmount}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                    {pots.map((pot, index) => {
                        if(index >= 4){
                            return null;
                        }
                        return(
                            <div key={pot._id} className=" relative pl-4 h-fit">
                                <span style={{backgroundColor:`var(--${pot.colorPref})`}} className="absolute left-0 top-0 w-1 h-full rounded-2xl"></span>
                                <p className="preset-5 text-(--gray-500)">{pot.potName}</p>
                                <p className="preset-4-bold">${Math.round(pot.currentAmount)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}