import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  className = '',
  headerAction
}) => {
  return (
    <div className={`bg-gray-700 rounded-lg shadow-lg overflow-hidden h-full ${className}`}>
      {/* Conditional header rendering */}
      {(title || headerAction) && (
        <div className="px-6 py-2 flex justify-between items-center">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {headerAction && (
            <div className="flex items-center">
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      {/* Card content */}
      <div className="p-4 h-full">
        {children}
      </div>
    </div>
  );
};
