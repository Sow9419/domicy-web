
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if user is on Service pages, PropertyDetails, AnnonceView or CreateAnnonce
  const isPropertyDetailsPage = location.pathname.includes('/propriete/');
  const isServicePage = location.pathname.includes('/service/') || location.pathname.includes('/creer-service');
  const isAnnoncePage = location.pathname.includes('/annonce') || location.pathname.includes('/creer-annonce');
  
  return (
    <div className="min-h-screen bg-white relative">
      {!isPropertyDetailsPage && !isServicePage && !isAnnoncePage && <Sidebar />}
      <div className={`${isMobile && !isPropertyDetailsPage && !isServicePage && !isAnnoncePage ? '' : isPropertyDetailsPage || isServicePage || isAnnoncePage ? '' : 'md:ml-16'}`}>
        <main className={`${isMobile && !isPropertyDetailsPage && !isServicePage && !isAnnoncePage ? 'pb-16' : ''}`}>
          {!isPropertyDetailsPage && !isServicePage && !isAnnoncePage && <Header />}
          <Outlet />
        </main>
      </div>
      {isMobile && !isPropertyDetailsPage && !isServicePage && !isAnnoncePage && <Sidebar isMobile={true} />}
    </div>
  );
};

export default Layout;
