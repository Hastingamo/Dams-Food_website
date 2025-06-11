import React from 'react'
import { Outlet } from 'react-router'
import Header from './Component/Header'
import Footer from './Component/Footer' 
function LayOut() {
  return (
    <div className='overflow-hidden'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default LayOut