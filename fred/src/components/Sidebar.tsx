import React from 'react';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`
      fixed top-[64px] left-0 w-64 h-full 
      bg-gray-900 text-white 
      transition-transform duration-300 
      shadow-lg z-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <nav className="flex flex-col p-4">
        <a href="/" className="py-2 hover:bg-gray-800 rounded flex items-center">
          <HomeIcon className="w-4 h-4 mr-2 ml-2" /> <span>Dashboard</span>
        </a>
        <a href="/explore" className="py-2 hover:bg-gray-800 rounded flex items-center">
          <MagnifyingGlassIcon className="w-4 h-4 mr-2 ml-2" /> <span>Explore</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;