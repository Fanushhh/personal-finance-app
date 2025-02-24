import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useTransactionFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const query = searchParams.get("query") || "";
    const sort = searchParams.get("sort") || "";
    const category = searchParams.get("category") || "";

    const setFilter = useCallback(
        (filters) => {
            
            const params = new URLSearchParams(searchParams.toString());

            
            if (filters.query !== undefined) {
                if (filters.query) {
                    params.set("query", filters.query); 
                } else {
                    params.delete("query"); 
                }
            }

            
            if (filters.sort !== undefined) {
                if (filters.sort) {
                    params.set("sort", filters.sort); 
                } else {
                    params.delete("sort");  
                }
            }

            
            if (filters.category !== undefined) {
                if (filters.category) {
                    params.set("category", filters.category); 
                } else {
                    params.delete("category");
                }
            }

            
            router.push(`?${params.toString()}`); 
        },
        [searchParams, router] 
    );

    return { query, sort, category, setFilter };
};
