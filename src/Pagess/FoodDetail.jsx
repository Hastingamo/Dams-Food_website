import React from 'react'
import FoodDetails from './FoodDetials'

function FoodDetail() {
  return (
    <>
        <div className='md:hidden  h-full w-screen bg-amber-200'><FoodDetails/></div>
        <div className='hidden md:h-full md:w-screen md:bg-amber-800'></div>
    </>
  )
}

export default FoodDetail