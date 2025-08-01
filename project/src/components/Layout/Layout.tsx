import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64 transition-all duration-300">
        <Header />
        
        <main className="min-h-screen pb-20">
          <div className="p-6">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}