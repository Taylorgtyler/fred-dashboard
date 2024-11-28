import { useQuery } from "@tanstack/react-query";
import { fetchGDPData } from "../api/fetchGDPData";

export const useGDPData = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['gdpData', startDate, endDate],
    queryFn: () => fetchGDPData(startDate, endDate)
  });
};