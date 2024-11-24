import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  isLoading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description, 
  isLoading = false 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="text-3xl font-bold text-blue-600 my-2">
        {isLoading ? '---' : value}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}; 