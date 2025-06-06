import React from 'react'
import Sidebars from '../Component/Sidebars'

function AddTochart() {
  return (
    <>
      <diiv className='flex flex-row min-h-screen'>
        <Sidebars/>
        <div className='flex-1 flex justify-center items-center bg-[#C88D84] ml-[80px]'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Add to Chart</h2>
            <p className='text-gray-600 mb-6'>Select items to add to your chart.</p>
            {/* Add your form or chart items here */}
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Add Item</button>
          </div>
        </div>
      </diiv>
    </>
  )
}

export default AddTochart