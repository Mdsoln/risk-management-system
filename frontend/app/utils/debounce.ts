// // utils/debounce.ts
// import { useEffect, useState } from 'react';

// export function useDebounce(value: string, delay: number): string {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }
import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

