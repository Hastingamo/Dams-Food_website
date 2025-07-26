import React from 'react'
import Homes from '../Component/Homes'
import Homess from '../Component/Homess'

function Hom() {
  return (
    <>
      <div className='flex xl:hidden'>
        <Homes/>
      </div>
      <div className='hidden xl:flex xl:flex-row'>
          <Homess/>
      </div>
    </>
  )
}

export default Hom