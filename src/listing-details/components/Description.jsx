import React from 'react'

const Description = ({car}) => {
  return (
    <div>
        {car?.listingDescription? 
            <div className='p-10 rounded-xl mt-6 bg-white shadow-md'>
            <h2 className='my-2 font-medium text-2xl'>Description</h2>
            <p>{car?.listingDescription}</p>
        </div>:<div className='w-full mt-7 h-[100px] bg-slate-200 animate-pulse rounded-xl'></div>}
    </div>
  )
}

export default Description
