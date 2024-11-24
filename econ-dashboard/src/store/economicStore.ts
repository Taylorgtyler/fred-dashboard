import { create } from 'zustand';
import { DataPoint, EconomicState, GDPDataPoint } from '../types/economicTypes';
import { fetchGDPData } from '../api/fetchers';

// Sample data
const DUMMY_DATA = {
  gdp: Array.from({ length: 20 }, (_, i) => ({
    DATE: new Date(2020 + i / 4, (i * 3) % 12, 1).toISOString(),
    GDPC1: Math.random() * 6 - 2 // Changed from 'value' to 'GDPC1'
  })),
  unemployment: Array.from({ length: 20 }, (_, i) => ({
    date: new Date(2020 + i / 4, (i * 3) % 12, 1).toISOString(),
    value: Math.random() * 4 + 3 // Random values between 3 and 7
  })),
  participation: Array.from({ length: 20 }, (_, i) => ({
    date: new Date(2020 + i / 4, (i * 3) % 12, 1).toISOString(),
    value: Math.random() * 5 + 60 // Random values between 60 and 65
  }))
};

const PRESIDENT_IMAGES: Record<string, string> = {
  'Joe Biden': 'https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg',
  'Donald Trump': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg',
  'Barack Obama': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg',
  'George W. Bush': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/George-W-Bush.jpeg',
  'Bill Clinton': 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Bill_Clinton.jpg'
};

export const useEconomicStore = create<EconomicState>((set) => ({
  gdp: [],
  unemployment: DUMMY_DATA.unemployment,
  participation: DUMMY_DATA.participation,
  selectedDateRange: [new Date(2020, 0, 1), new Date()],
  selectedPresident: null,
  presidentImage: null,
  isLoading: false,
  fetchData: async (startDate: string, endDate: string) => {
    set({ isLoading: true });
    try {
      console.log('Fetching data for range:', startDate, 'to', endDate);
      const gdpData = await fetchGDPData(startDate, endDate);
      console.log('Received GDP data:', gdpData);
      
      if (!gdpData || !Array.isArray(gdpData)) {
        console.error('Invalid GDP data received:', gdpData);
        return;
      }

      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
      
      const filteredData = {
        gdp: gdpData.filter((d: GDPDataPoint) => {
          const timestamp = new Date(d.DATE).getTime();
          return timestamp >= startTimestamp && timestamp <= endTimestamp;
        }),
        unemployment: DUMMY_DATA.unemployment.filter(d => {
          const timestamp = new Date(d.date).getTime();
          return timestamp >= startTimestamp && timestamp <= endTimestamp;
        }),
        participation: DUMMY_DATA.participation.filter(d => {
          const timestamp = new Date(d.date).getTime();
          return timestamp >= startTimestamp && timestamp <= endTimestamp;
        })
      };
      
      console.log('Filtered GDP data:', filteredData.gdp);
      set(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ gdp: DUMMY_DATA.gdp });
    } finally {
      set({ isLoading: false });
    }
  },
  setDateRange: (range) => {
    set({ selectedDateRange: range });
  },
  setPresident: async (president) => {
    set({ selectedPresident: president });
    try {
      set({ presidentImage: PRESIDENT_IMAGES[president] || null });
    } catch (error) {
      console.error('Error fetching president image:', error);
    }
  }
}));

export default useEconomicStore; 