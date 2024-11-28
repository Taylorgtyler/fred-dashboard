import { useQuery } from "@tanstack/react-query";
import { fetchUnemploymentRateData } from "../api/fetchUnemploymentRateData";

export const useURData = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['urData', startDate, endDate],
    queryFn: () => fetchUnemploymentRateData(startDate, endDate)
  });
};