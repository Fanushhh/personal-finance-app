

import { getPots } from "@/app/actions/pots";
import { Pot } from "../Pot/Pot";
export const PotsList = async () => {
    const pots = await getPots();
    if(pots.length === 0){
        return(
            <div className="flex gap-6 flex-wrap">
                <p>Looks like there are no pots in your accout. How about you create one!</p>
            </div>
        )
    }
    return(
        <div className="flex gap-6 flex-wrap">
            {pots.map((pot) => {
                return(
                    <Pot currentAmount={pot.currentAmount} key={pot._id} id={pot._id} potName={pot.potName} target={pot.target} colorPref={pot.colorPref} />
                )
            })}
        </div>
    )
}