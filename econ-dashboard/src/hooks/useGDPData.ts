import { useQuery } from '@tanstack/react-query';
import { fetchGDPData } from '../api/fetchers';
import { AxiosError } from 'axios';

export const useGDPData = (startDate: string, endDate: string) => {
  const queryResult = useQuery({
    queryKey: ['gdp', startDate, endDate],
    queryFn: () => fetchGDPData(startDate, endDate),
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