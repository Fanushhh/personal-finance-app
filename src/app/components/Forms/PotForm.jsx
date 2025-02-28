'use client'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getPots } from "@/app/actions/pots";
import React, { useActionState } from "react";
import { createPot } from "@/app/actions/pots";
const options = [
    {value:'', label:'Select a color'},
    {value:'green', label:'Green'},
    {value:'yellow', label:'Yellow'},
    {value:'cyan', label:'Cyan'},
    {value:'navy', label:'Navy'},
    {value:'red', label:'Red'},
    {value:'purple', label:'Purple'},
    {value:'turquoise', label:'Turquoise'},
    {value:'blue', label:'Blue'},
    {value:'orange', label:'Orange'},
];



export const PotForm = ({closeModal}) => {
    const queryClient = useQueryClient()
    const [message, formAction] = useActionState(createPot, undefined);
   
    const {data} = useQuery({ queryKey: ['pots'], queryFn: () => getPots() });
   
    const updatedColors = options.filter((option) => {
        return !data?.some((pot) => pot.colorPref === option.value)
    });
    
   
    
    React.useEffect(() => {
        if(message?.success){
            queryClient.invalidateQueries('pots');
            closeModal();
        }

    }, [message, closeModal, queryClient])
    
   
    return(
        <div className="relative flex-col rounded-xl gap-4 bg-white p-6  shadow-lg">
                <div className="flex justify-between items-start mb-3">
                    <div className="max-w-[500px]">
                        <h1 className="preset-1 mb-4">Add New Pot</h1>
                        <p className="preset-4 text-[var(--beige-500)]">Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                    </div>
                    
                </div>
                
                <form action={formAction} className="*:flex *:flex-col ">
                    <div>
                        <label htmlFor="potName">Pot name</label>
                        <input type="text" id="potName" name="potName" autoComplete="off" placeholder="e.g Rainy Days"/>
                        {!message?.success && <p className="text-red-500">{message?.message.potName}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="target">Target</label>
                        <input placeholder="$ e.g. 2000" type="text" id="target" name="target" autoComplete="off"/>
                        {!message?.success && <p className="text-red-500">{message?.message.target}</p>}
                    </div>
                    
                    <div className="">
                        <label htmlFor="colorPref">Theme</label>
                        <select name="colorPref" id="colorPref" className="px-6 relative">
                            {
                                updatedColors.map((option) => {
                                    return <option style={{color:`var(--${option.value}`}} key={crypto.randomUUID()} value={option.value}>{option.label}</option>
                                })
                            }
                            
                        </select>
                        {!message?.success && <p className="text-red-500">{message?.message.colorPref}</p>}
                    </div>
                    
                    <button className="text-center" type="submit" disabled={updatedColors.length === 0}>Add Pot</button>
                    
                </form>
            </div>
    )
}