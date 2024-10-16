import React from 'react'
import Data from '@/Shared/Data'
import { Link } from 'react-router-dom'
const Category = () => {
  return (
    <div className='mt-40 mb-14'>
        <h2 className='font-bold border-b-2 w-fit mx-auto text-3xl text-center mb-8' >Browse By Type</h2>
        <div className='grid grid-col-3 sm:grid-cols-4 md:grid-col-4 gap-6 px-20 lg:grid-cols-9 '> 
            {Data.Category.map((item)=>{
              return <Link to={'search/'+item.name}>
                 <div className='border rounded-md p-3 flex flex-col items-center hover:shadow-md cursor-pointer border-black'>
                    <img src={item.icon} width={35} height={35} alt="" srcset="" />
                    <h2 className='mt-2'>{item.name}</h2>
                </div>
              </Link>
            })}
        </div>
    </div>
  )
}

export default Category
