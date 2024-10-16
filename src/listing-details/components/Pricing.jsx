import React from 'react'
import { Button } from '@/Components/ui/button'
import { MdOutlineLocalOffer } from "react-icons/md";
const Pricing = ({car}) => {
  return (
    <div className='p-10 rounded-xl border shadow-md'>
        <h2 className='text-xl'>Our Price</h2>
        {car?.sellingPrice?<h2 className='font-bold text-4xl mt-2'>${car?.sellingPrice}</h2>:
        <h2 className='w-[50%] mt-2 animate-pulse bg-slate-200 h-8'></h2>}
        <Button className="w-full mt-7" size="lg"><MdOutlineLocalOffer  className='text-lg mr-2'/>Make an Offer Price</Button>
    </div>
  )
}

export default Pricing
