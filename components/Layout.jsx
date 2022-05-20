import React from 'react';
import { Navbar, Footer } from '@components/index';

const Layout = ({ children }) => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
