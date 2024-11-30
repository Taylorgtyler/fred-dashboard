import { axiosInstance } from '../axiosinstance';

// Fetch federal funds effective rate data from api
export const fetchFFERData = async (startDate: string, endDate: string) => {
    return axiosInstance.get(`/federal-funds-effective-rate?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        // Log the response data for debug
        console.log(response.data);
        const data = response.data;
        if (!data || !Array.isArray(data)) {
          console.error('Invalid data format received from API');
          return [];
        }
        return data;
      })
      .catch(error => {
        console.error('Error fetching FFER data:', error);
        throw error;
      });
  };