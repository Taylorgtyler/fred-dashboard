import { axiosInstance } from '../axiosInstance';

// Fetches GDP data from the API
export const fetchGDPData = async (startDate: string, endDate: string) => {
  console.log('Fetching GDP data...');
  return axiosInstance.get(`/real-gdp?startDate=${startDate}&endDate=${endDate}`)
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
      console.error('Error fetching GDP data:', error);
      throw error;
    });
};

// Fetches GDP per capita data from the API
export const fetchGDPPerCapitaData = async (startDate: string, endDate: string) => {
  return axiosInstance.get(`/real-gdp-per-capita?startDate=${startDate}&endDate=${endDate}`)
    .then(response => {
      console.log('Response:', response);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching GDP per capita data:', error);
      throw error; // Rethrow the error for further handling if needed
    });
};