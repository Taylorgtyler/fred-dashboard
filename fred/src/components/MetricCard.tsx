import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  isLoading?: boolean;
  isPercentage?: boolean;
  isCurrency?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description, 
  isLoading = false,
  isPercentage = false,
  isCurrency = false
}) => {
  return (
    <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="text-3xl font-bold text-blue-400 my-2">
        {isLoading ? '---' : isPercentage ? `${value}%` : isCurrency ? `$${value}` : value}
      </div>
      <p className="text-sm text-gray-200">{description}</p>
    </div>
  );
}; 