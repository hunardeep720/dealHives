import React from 'react'
import Space from './Space'
import HomeImage from './HomeImage';
import CategoryImage from './CategoryImage';
function HomeContent() {
  return (
    <div  className='mx-auto w-auto mb-12  h-screen z-[10]'>
        <Space />
        <div className='grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6'>
            <div>
                <CategoryImage sourceImg={HomeImage.electronics[0]}/>
            </div>
        </div>
    </div>
  )
}

export default HomeContent