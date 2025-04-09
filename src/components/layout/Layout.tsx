
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if user is on Service pages or PropertyDetails
  const isPropertyDetailsPage = location.pathname.includes('/propriete/');
  const isServicePage = location.pathname.includes('/service/') || location.pathname.includes('/creer-service');
  
  return (
    <div className="min-h-screen bg-white relative">
      {!isPropertyDetailsPage && !isServicePage && <Sidebar />}
      <div className={`${isMobile && !isPropertyDetailsPage && !isServicePage ? '' : isPropertyDetailsPage || isServicePage ? '' : 'md:ml-16'}`}>
        {!isPropertyDetailsPage && !isServicePage && <Header />}
        <main className={`${isMobile && !isPropertyDetailsPage && !isServicePage ? 'pb-16' : ''} ${!isPropertyDetailsPage && !isServicePage ? 'pt-16 md:pt-20' : ''}`}>
          <Outlet />
        </main>
      </div>
      {isMobile && !isPropertyDetailsPage && !isServicePage && <Sidebar isMobile={true} />}
    </div>
  );
};

export default Layout;
