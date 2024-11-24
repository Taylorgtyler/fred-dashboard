export type DataPoint = {
  date: string;
  value: number;
};

export type GDPDataPoint = {
  DATE: string;
  GDPC1: number;
};

export interface EconomicState {
  gdp: GDPDataPoint[];
  unemployment: DataPoint[];
  participation: DataPoint[];
  selectedDateRange: [Date, Date];
  selectedPresident: string | null;
  presidentImage: string | null;
  isLoading: boolean;
  fetchData: (startDate: string, endDate: string) => Promise<void>;
  setDateRange: (range: [Date, Date]) => void;
  setPresident: (president: string) => Promise<void>;
}
