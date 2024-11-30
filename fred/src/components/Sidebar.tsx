import React from 'react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`
      fixed top-[64px] left-0 w-64 h-full 
      bg-gray-800 text-white 
      transition-transform duration-300 
      shadow-lg z-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <nav className="flex flex-col p-4">
        <a href="/" className="py-2 hover:bg-gray-700 rounded">Dashboard</a>
        <a href="/about" className="py-2 hover:bg-gray-700 rounded">About</a>
        <a href="/contact" className="py-2 hover:bg-gray-700 rounded">Contact</a>
      </nav>
    </div>
  );
};

export default Sidebar;
