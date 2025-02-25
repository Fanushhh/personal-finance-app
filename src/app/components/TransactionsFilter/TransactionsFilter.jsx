import { useDebounce } from "@/app/hooks/useDebouce";
import { useTransactionFilter } from "@/app/hooks/useTransasctionFilter";
import Image from "next/image";
import { useEffect, useState, useId } from "react";

const sortOptions = [
    "latest",
    "oldest",
    "a to z",
    "z to a",
    "highest",
    "lowest",
];
const filterOptions = [
    "",
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General",
]
export const TransactionFilter = ({setPage}) => {
    const {query, sort, category, setFilter} = useTransactionFilter();
    const randomId = useId();
    const [localQuery, setLocalQuery] = useState(query);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const debounchedSearch = useDebounce(localQuery)
    console.log(debounchedSearch)
    useEffect(()=> {
        setFilter({query: debounchedSearch})
    }, [debounchedSearch]);
    const handleSortSelect = (sortOption) => {
        setFilter({sort: sortOption});
        setShowSort(!showSort)
        
    }
    const handleFilterSelect = (filterOption) => {
        setFilter({category: filterOption});
        setShowFilter(!showFilter)
        
    }

    return(
        <section className="flex justify-between gap-6 mb-6">
            <fieldset className="w-full max-w-[200px] min-[800px]:max-w-[320px]">
                <input value={localQuery} onChange={(e) => {
                    setPage(0);
                    setLocalQuery(e.target.value)}} className="w-full" type="query" name="query" id="query" placeholder="Search transaction"/>
            </fieldset>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button onClick={() => {
                        setShowSort(!showSort)}} type="button" className="min-[1000px]:hidden">
                        <Image width={20} height={20} src="/assets/images/icon-sort-mobile.svg" alt="sort icon"/>
                    </button>
                    {showSort && <div className="absolute flex min-[1001px]:hidden flex-col bg-white w-30 shadow-md rounded-md right-0 p-2 *:p-2">
                        {sortOptions.map((sortOption, index) => {
                            const id = `${randomId}-${index}`
                            return <span key={id} onClick={() => handleSortSelect(sortOption)} className={`${sort===sortOption ? 'font-bold!' : ''} border-b-1 border-(--beige-100)`}>{sortOption}</span>
                        })}
                    </div>}
                </div>
                <div className="relative">
                    <button type="button" onClick={() => setShowFilter(!showFilter)} className="min-[1000px]:hidden">
                        <Image width={20} height={20} src="/assets/images/icon-filter-mobile.svg" alt="filter icon"/>
                    </button>
                    {showFilter && <div className="absolute flex min-[1001px]:hidden flex-col bg-white w-40 shadow-md rounded-md right-0 p-2 *:p-2">
                        {filterOptions.map((filterOption, index) => {
                            const id = `${randomId}-${index}`
                            return <span key={id} onClick={() => handleFilterSelect(filterOption)} data-value={filterOption} className={`${category === filterOption ? 'font-bold!' : ''}  cursor-pointer border-b-1 border-(--beige-100)`}>{filterOption === "" ? "All Transactions" : filterOption}</span>
                        })}
                    </div>}
                </div>
            </div>
            <div className="hidden gap-6 min-[1001px]:flex">
                <fieldset className="flex gap-4 items-center">
                    <label className="" htmlFor="sort">Sort by</label>
                    <select onChange={(e) => setFilter({sort:e.target.value})} value={sort} name="sort" id="sort" className="pr-10!">
                        <option value="">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="a to z">A to Z</option>
                        <option value="z to a">Z to A</option>
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                    </select>
                </fieldset>
                <fieldset className="flex gap-4 items-center">
                    <label className="" htmlFor="category">Category</label>
                    <select onChange={(e) => setFilter({category:e.target.value})} value={category} name="category" id="category" className="pr-10!">
                        <option value="">All transactions</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Dining Out">Dining Out</option>
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