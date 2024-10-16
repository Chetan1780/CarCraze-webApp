import React from 'react'

function ImageGallery({car}) {
  if (!car || !car.images || car.images.length === 0) {
    return <div className='w-full bg-slate-200 rounded-xl h-[500px] animate-pulse'></div>; // or a loading spinner
  }
  return (
    <div>
      <img src={car.images[0].imageUrl} className='w-full h-[500px] object-cover rounded-xl' alt="" />
    </div>
  )
}

export default ImageGallery
