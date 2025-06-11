import React from 'react'
import { Outlet } from 'react-router'
import Header from './Component/Header'
import Footer from './Component/Footer' 
function LayOut() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow overflow-y-auto bg-gradient-to-b from-white to-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LayOut