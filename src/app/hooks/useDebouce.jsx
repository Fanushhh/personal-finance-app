import { useState, useEffect } from "react"

export const useDebounce = (value, delay=500) => {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);
    return debounce;
}