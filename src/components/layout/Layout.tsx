
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-white relative">
      <Sidebar />
      <div className={`${isMobile ? '' : 'md:ml-16'}`}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      {isMobile && <Sidebar isMobile={true} />}
    </div>
  );
};

export default Layout;
