import { axiosInstance } from "../axiosinstance"

// Fetches Labor Force Participation Rate data from the api
export const fetchLFPRData = async (startDate: string, endDate: string) => {
  return axiosInstance.get(`/labor-force-participation-rate?startDate=${startDate}&endDate=${endDate}`)
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
      console.error('Error fetching Labor Force Participation Rate data:', error);
      throw error;
    });
}