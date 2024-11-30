import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Header toggleSidebar={toggleSidebar} />
      <div className="relative">
        <Sidebar isOpen={isSidebarOpen} />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout; 