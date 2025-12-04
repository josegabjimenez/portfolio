import React from 'react';
import { Navbar, Footer } from '@components/index';
import ParticlesBackground from '@components/Particles';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* Primary glow orb - top right */}
        <div className="glow-orb glow-primary w-[500px] h-[500px] -top-48 -right-48 animate-pulse-glow" />
        {/* White glow orb - left center */}
        <div className="glow-orb glow-white w-[300px] h-[300px] top-1/3 -left-32 animate-float" />
        {/* Small primary orb - bottom left */}
        <div className="glow-orb glow-primary w-[200px] h-[200px] bottom-48 left-1/4 animate-float-delayed" />
        {/* White orb - bottom right */}
        <div className="glow-orb glow-white w-[250px] h-[250px] bottom-20 right-1/4 opacity-20 animate-float" />
      </div>

      {/* Blueprint Grid Background */}
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="blueprint-scan" aria-hidden="true" />
      <div className="blueprint-perspective" aria-hidden="true" />

      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
