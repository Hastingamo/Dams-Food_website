import React from 'react';
import { Outlet } from 'react-router';
import Header from './Component/Header';
import Footer from './Component/Footer';

function LayOut() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default LayOut;
