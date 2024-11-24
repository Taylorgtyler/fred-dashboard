import React from 'react';
import useEconomicStore from '../store/economicStore';

const presidents = [
  'Joe Biden',
  'Donald Trump',
  'Barack Obama',
  'George W. Bush',
  'Bill Clinton'
];

export const PresidentSelector: React.FC = () => {
  const { setPresident } = useEconomicStore();

  return (
    <select
      onChange={(e) => setPresident(e.target.value)}
      className="border rounded-md p-2"
    >
      <option value="">Select President</option>
      {presidents.map((president) => (
        <option key={president} value={president}>
          {president}
        </option>
      ))}
    </select>
  );
}; 