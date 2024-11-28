import { axiosInstance } from '../axiosinstance';

// Fetches GDP data from the API
export const fetchUnemploymentRateData = async (startDate: string, endDate: string) => {
  return axiosInstance.get(`/unemployment-rate?startDate=${startDate}&endDate=${endDate}`)
    .then(response => {
      const data = response.data;
      if (!data || !Array.isArray(data)) {
        console.error('Invalid data format received from API');
        return [];
      }
      return data;
    })
    .catch(error => {
      console.error('Error fetching Unemployment Rate data:', error);
      throw error;
    });
};