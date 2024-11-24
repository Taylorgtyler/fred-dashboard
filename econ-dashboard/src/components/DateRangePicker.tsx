import React from 'react';
import useEconomicStore from '../store/economicStore';

export const DateRangePicker: React.FC = () => {
  const { selectedDateRange, setDateRange, fetchData } = useEconomicStore();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newDate = new Date(event.target.value);
    const newRange: [Date, Date] = [...selectedDateRange] as [Date, Date];
    newRange[index] = newDate;
    setDateRange(newRange);
    
    fetchData(
      newRange[0].toISOString().split('T')[0],
      newRange[1].toISOString().split('T')[0]
    );
  };

  return (
    <div className="flex gap-4">
      <input
        type="date"
        value={selectedDateRange[0].toISOString().split('T')[0]}
        onChange={(e) => handleDateChange(e, 0)}
        className="border rounded-md p-2"
      />
      <input
        type="date"
        value={selectedDateRange[1].toISOString().split('T')[0]}
        onChange={(e) => handleDateChange(e, 1)}
        className="border rounded-md p-2"
      />
    </div>
  );
}; 