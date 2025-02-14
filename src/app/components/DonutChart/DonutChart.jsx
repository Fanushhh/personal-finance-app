'use client'

import { getBugets } from "@/app/actions/bugets"
import { useQuery, useQueryClient } from "@tanstack/react-query"
export const DonutChart = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['budgets'],
        queryFn: getBugets,
    });
    const colors = data?.map(budget => budget.colorPref);

    console.log(colors);
    const totalAmount = data?.reduce((acc, budget) => acc + Number(budget.maxSpend), 0);
    console.log(totalAmount);
    
    
   

    
    
    
    // create a gradient based on the colors in budgets
    // for each budget we add a new color in the cradient
    // that color stop and end  should be determined by the amount
    // the total amount is the sum of all budgets
    // budget circle size should be calculated based of the procentage of the total amount
    // if a bill budget has 600 out of the total of 1000 that contains other budgets, 
    // that makes up for 60% of the circle
    // biggest procentage should be the first one


    

    return(
        <figure className="flex flex-col justify-center max-w-full ">
            <div className={`size-60 rounded-full bg-[radial-gradient(white_45%,transparent_0_70%,white_100%),conic-gradient()]`}></div>

            <figcaption>Budgets</figcaption>
        </figure>
    )
}