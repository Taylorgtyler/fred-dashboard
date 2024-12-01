import { axiosInstance } from "../axiosinstance"

// Fetches Real Median Personal Income data from the api
export const fetchRMPIData = async (startDate: string, endDate: string) => {
  return axiosInstance.get(`/real-median-personal-income?startDate=${startDate}&endDate=${endDate}`)
    .then(response => {
      console.log('Raw API response:', response);
      const data = response.data;
      if (!data || !Array.isArray(data)) {
        console.error('Invalid data format received from API');
        return [];
      }
      return data;
    })
    .catch(error => {
      console.error('Error fetching Real Median Personal Income data:', error);
      throw error;
    });
}