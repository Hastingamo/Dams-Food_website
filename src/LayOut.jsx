import React from 'react'
import { Outlet } from 'react-router'
import Header from './Component/Header'
import Footer from './Component/Footer' 
function LayOut() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default LayOut