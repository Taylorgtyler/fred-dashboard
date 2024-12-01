import { useQuery } from "@tanstack/react-query";
import { fetchRMPIData } from "../api/fetchRMPIData";

export const useRMPIData = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['rmpiData', startDate, endDate],
    queryFn: () => fetchRMPIData(startDate, endDate)
  });
};