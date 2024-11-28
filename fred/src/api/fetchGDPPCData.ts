import { axiosInstance } from "../axiosinstance"

// Fetches GDP per capita data from the API
export const fetchGDPPCData = async (startDate: string, endDate: string) => {
  return axiosInstance.get(`/real-gdp-per-capita?startDate=${startDate}&endDate=${endDate}`)
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
      console.error('Error fetching GDP per capita data:', error);
      throw error;
    });
}