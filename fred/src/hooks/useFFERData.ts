import { useQuery } from "@tanstack/react-query";
import { fetchFFERData } from "../api/fetchFFERData";

export const useFFERData = (startDate: string, endDate: string) => {
    return useQuery({
        queryKey: ['federal-funds-effective-rate', startDate, endDate],
        queryFn: () => fetchFFERData(startDate, endDate),
    });
};