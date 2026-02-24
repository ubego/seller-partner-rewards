import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      {/* Hero section */}
      <Hero />
      {/* Main content - Calculator */}
      <div className="flex-grow">
        <Calculator />
      </div>
    </main>
  );
}
