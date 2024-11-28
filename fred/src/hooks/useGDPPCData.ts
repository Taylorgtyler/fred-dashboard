import { useQuery } from "@tanstack/react-query";
import { fetchGDPPCData } from "../api/fetchGDPPCData";

export const useGDPPCData = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['gdpPCData', startDate, endDate],
    queryFn: () => fetchGDPPCData(startDate, endDate)
  });
};