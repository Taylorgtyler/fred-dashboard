import { useState } from 'react';
import { useFilterStore } from '../store/filterStore';

export const DateFilter = () => {
  const { startDate, endDate, setDateRange, resetFilters } = useFilterStore();
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleApplyFilter = () => {
    setDateRange(localStartDate, localEndDate);
  };

  return (
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-sm text-white mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 bg-transparent [color-scheme:dark] text-white"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-sm text-white mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 bg-transparent [color-scheme:dark] text-white"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleApplyFilter}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Apply
          </button>
          <button
            onClick={resetFilters}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black"
          >
            Reset
          </button>
        </div>
      </div>
  );
};

export default DateFilter;