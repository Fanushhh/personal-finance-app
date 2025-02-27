import { useQueryClient } from "@tanstack/react-query";
import { useActionState } from "react";
import { editBudget } from "@/app/actions/bugets";
import React from "react";

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
]
const categories = [
    {value:'', label:'Select a category'},
    {value:'Entertainment', label:'Entertainment'},
    {value:'Bills', label:'Bills'},
    {value:'Groceries', label:'Groceries'},
    {value:'Dining Out', label:'Dining Out'},
    {value:'Transportation', label:'Transportation'},
    {value:'Personal Care', label:'Personal Care'},
    {value:'Education', label:'Education'},
    {value:'Lifestyle', label:'Lifestyle'},
    {value:'Shopping', label:'Shopping'},
    {value:'General', label:'General'},

]


export const EditBudgetForm = ({category, id,maxSpend, colorPref, closeModal}) => {
    const queryClient = useQueryClient();
    
    const [message, formAction] = useActionState(editBudget, undefined);
    
    const [budgetData, setBudgetData] = React.useState({
        budgetCategory: category,
        maxSpend,
        colorPref
    });
    React.useEffect(() => {
            if(message?.success){
                queryClient.invalidateQueries('budgets');
                closeModal();
            }
    
        }, [message,closeModal, queryClient])
    return(
        <div className="relative flex-col w-full max-w-[540px] gap-4  bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-3">
                    <div className="max-w-[500px]">
                        <h1 className="preset-1 mb-4">Edit {category}</h1>
                        <p className="preset-4 text-[var(--beige-500)]">As your budgets change, feel free to update your spending limits.</p>
                    </div>
                    
                </div>
                
                <form action={formAction} className="*:flex *:flex-col ">
                    <input type="hidden" name="budgetId" value={id}/>
                    <div>
                        <label htmlFor="budgetCategory">Budget Category</label>
                       <select defaultValue={budgetData.budgetCategory} onChange={(e) => {
                            setBudgetData({
                                 ...budgetData,
                                 budgetCategory: e.target.value
                            })
                       }} name="budgetCategory" id="budgetCategory">
                        {categories.map((availableCategory) => {
                            return <option key={availableCategory.value} value={availableCategory.value}>{availableCategory.label}</option>
                        })}
                       </select>
                    </div>
                    <div>
                        <label htmlFor="maxSpend">Maximum Spend</label>
                        <input value={budgetData.maxSpend} onChange={(e) => {
                            setBudgetData({
                                ...budgetData,
                                maxSpend: e.target.value
                            })
                        }} placeholder="$ e.g. 2000" type="text" id="maxSpend" name="maxSpend" autoComplete="off"/>
                    </div>
                    <div className="">
                        <label htmlFor="colorPref">Theme</label>
                        <select value={budgetData.colorPref} onChange={(e) => {
                            setBudgetData({
                                ...budgetData,
                                colorPref: e.target.value
                            })
                        }} name="colorPref" id="colorPref" className="px-6 relative">
                            
                            {options.map(option => (
                                <option className=""  key={option.value} style={{color:`var(--${option.value})`}} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="text-center">Save changes</button>
                </form>
            </div>
    )
}