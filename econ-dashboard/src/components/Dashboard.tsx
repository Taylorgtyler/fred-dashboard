import React from 'react';
import { DateRangePicker } from './DateRangePicker';
import { PresidentSelector } from './PresidentSelector';
import { MetricCard } from './MetricCard';
import { GDPChart } from './GDPChart';
import { LaborChart } from './LaborChart';
import useEconomicStore from '../store/economicStore';

export const Dashboard: React.FC = () => {
  const { gdp, unemployment, participation, presidentImage, isLoading } = useEconomicStore();

  console.log('Is Loading:', isLoading);
  console.log('GDP array:', gdp);

  const latestGDP = !isLoading && gdp.length > 0 ? gdp[gdp.length - 1].GDPC1 : null;
  console.log('Latest GDP:', latestGDP);
  const latestUnemployment = unemployment[unemployment.length - 1]?.value || 0;
  const latestParticipation = participation[participation.length - 1]?.value || 0;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Economic Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <DateRangePicker />
          <PresidentSelector />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
        <MetricCard
          title="Latest GDP"
          value={latestGDP !== null ? `${latestGDP}` : '---'}
          description="Quarter-over-quarter, annualized"
          isLoading={isLoading}
        />
        <MetricCard
          title="Unemployment Rate"
          value={`${latestUnemployment.toFixed(1)}%`}
          description="U-3 Rate"
        />
        <MetricCard
          title="Labor Force Participation"
          value={`${latestParticipation.toFixed(1)}%`}
          description="Civilian Participation Rate"
        />
      </div>

      {presidentImage && (
        <div className="mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <img 
              src={presidentImage} 
              alt="Selected President"
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg mx-auto"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <GDPChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <LaborChart />
        </div>
      </div>
    </div>
  );
}; 