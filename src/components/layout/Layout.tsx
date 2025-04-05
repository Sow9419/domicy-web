
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Vérifier si l'utilisateur est sur la page PropertyDetails
  const isPropertyDetailsPage = location.pathname.includes('/propriete/');
  
  return (
    <div className="min-h-screen bg-white relative">
      {!isPropertyDetailsPage && <Sidebar />}
      <div className={`${isMobile && !isPropertyDetailsPage ? '' : isPropertyDetailsPage ? '' : 'md:ml-16'}`}>
        {!isPropertyDetailsPage && <Header />}
        <main className={`${isMobile && !isPropertyDetailsPage ? 'pb-16' : ''} ${!isPropertyDetailsPage ? 'pt-16 md:pt-20' : ''}`}>
          <Outlet />
        </main>
      </div>
      {isMobile && !isPropertyDetailsPage && <Sidebar isMobile={true} />}
    </div>
  );
};

export default Layout;
