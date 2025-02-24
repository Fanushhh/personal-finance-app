import { useDebounce } from "@/app/hooks/useDebouce";
import { useTransactionFilter } from "@/app/hooks/useTransasctionFilter";
import { useEffect, useState } from "react";


export const TransactionFilter = ({setPage}) => {
    const {query, sort, category, setFilter} = useTransactionFilter();

    const [localQuery, setLocalQuery] = useState(query);
    const debounchedSearch = useDebounce(localQuery)
    console.log(debounchedSearch)
    useEffect(()=> {
        setFilter({query: debounchedSearch})
    }, [debounchedSearch])
    return(
        <section className="flex justify-between mb-6">
            <fieldset className="w-full max-w-[320px]">
                <input value={localQuery} onChange={(e) => {
                    setPage(0);
                    setLocalQuery(e.target.value)}} className="w-full" type="query" name="query" id="query" placeholder="Search transaction"/>
            </fieldset>
            <div className="flex gap-6">
                <fieldset className="flex gap-4 items-center">
                    <label className="" htmlFor="sort">Sort by</label>
                    <select onChange={(e) => setFilter({sort:e.target.value})} value={sort} name="sort" id="sort" className="pr-10!">
                        <option value="">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="a to z">A to Z</option>
                        <option value="z to a">Z to A</option>
                        <option value="descending">Highest</option>
                        <option value="ascending">Lowest</option>
                    </select>
                </fieldset>
                <fieldset className="flex gap-4 items-center">
                    <label className="" htmlFor="category">Category</label>
                    <select onChange={(e) => setFilter({category:e.target.value})} value={category} name="category" id="category" className="pr-10!">
                        <option value="">All transactions</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Dinning Out">Dinning Out</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Education">Education</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Shopping">Shopping</option>
                        <option value="General">General</option>
                    </select>
                </fieldset>
            </div>
        </section>
    )
}        