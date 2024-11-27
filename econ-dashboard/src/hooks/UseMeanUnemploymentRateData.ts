import { useQuery } from '@tanstack/react-query';
import { fetchGDPData, fetchMeanUnemploymentRateData } from '../api/fetchers';
import { AxiosError } from 'axios';

export const useMeanUnemploymentRateData = (startDate: string, endDate: string) => {
  const queryResult = useQuery({
    queryKey: ['mean-unemployment-rate', startDate, endDate],
    queryFn: () => fetchMeanUnemploymentRateData(startDate, endDate),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });

  // Return the desired properties
  return {
    data: queryResult.data,
    error: queryResult.error,
    isError: queryResult.isError,
  };
};