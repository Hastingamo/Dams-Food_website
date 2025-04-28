import React from 'react'
import Sidebars from '../Component/Sidebars.jsx'
import Cock from '../Component/Cock.jsx'
function CockTailss() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <div>
      <Sidebars/>
    </div>
    <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-4">Cocktail</h1>
      <Cock/>
    </div>
  </div>
  )
}

export default CockTailss