import { useQuery } from "@tanstack/react-query";
import { fetchLFPRData } from "../api/fetchLFPRData";

export const useLFPRData = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['lfprData', startDate, endDate],
    queryFn: () => fetchLFPRData(startDate, endDate)
  });
};