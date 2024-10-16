import IconField from '@/add-listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

const Specification = ({carDetail}) => {
  return (
    <div className='p-8 rounded-xl border shadow-md mt-7'>
      <h2 className='font-medium text-4xl mb-5'>Specification</h2>
      {carDetail? CarSpecification.map((item,index)=>(
        <div className='mt-3 flex items-center justify-between' >
          <h1 className='flex gap-2'><IconField icon={item.icon}/> {item.label} </h1>
            <h2>{carDetail[item.name]}</h2>
        </div>
      )):<div className='w-full h-[500px] rounded-xl animate-pulse bg-slate-200'></div>}
    </div>
  )
}

export default Specification
