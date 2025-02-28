'use client'
import { useQuery } from "@tanstack/react-query"
import { getPots } from "@/app/actions/pots";
import { Pot } from "../Pot/Pot";
export const PotsList = () => {
    const {data, isLoading, isError, error} = useQuery({ queryKey: ['pots'], queryFn: () => getPots() });

    if(isLoading){
        return <p>Loading pots...</p>
    }
    if(isError){
        return <p>Error: {error.message}</p>
    }
    if(data.length === 0){
        return(
            <div className="flex gap-6 flex-wrap">
                <p>Looks like there are no pots in your accout. How about you create one!</p>
            </div>
        )
    }
    return(
        <div className="flex gap-6 flex-wrap">
            {data?.map((pot) => {
                return(
                    <Pot currentAmount={pot.currentAmount} key={pot._id} id={pot._id} potName={pot.potName} target={pot.target} colorPref={pot.colorPref} />
                )
            })}
        </div>
    )
}