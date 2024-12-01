import { create } from 'zustand';
import { FilterState } from '../types/dataTypes';

export const useFilterStore = create<FilterState>((set) => ({
    startDate: '2000-01-01',
    endDate: new Date().toISOString().split('T')[0],
    setDateRange: (startDate: string, endDate: string) => 
      set({ startDate, endDate }),
    resetFilters: () => 
      set({ startDate: '2000-01-01', endDate: new Date().toISOString().split('T')[0] }),
  }));