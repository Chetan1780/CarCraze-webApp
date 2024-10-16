import Search from '@/components/Search'
import { db } from './../../../configs'
import { CarImages, carListing } from './../../../configs/schema'
import React from 'react'
import { useParams } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import Service from '@/Shared/Service'
import CarItem from '@/components/CarItem'
import Navbar from '@/components/Navbar'
const SearchByCategory = () => {
  const { category } = useParams();
  const [carList, setcarList] = useState([])
  const [loading, setloading] = useState(true)
  useEffect(() => {
    GetCarList();
    setloading(false);
  }, [])

  const GetCarList = async () => {
    const result = await db.select().from(carListing).leftJoin(CarImages, eq(carListing.id, CarImages.carListingId)).where(eq(carListing.category, category));
    const data = Service.FormatResult(result)
    setcarList(data)
  }
  return (
    <div>
      <Navbar />
      <div className='p-16 bg-black flex justify-center'>
        <Search />
      </div>
      <div className=' p-10 md:px-20'>
        <h2 className='font-bold text-4xl '>{category}</h2>
        <div className='grid px-10 gap-5 mt-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

          {carList.length>0 && carList.map((item, index) => (
            <div key={index}>
              <CarItem car={item} />
            </div>
          ))}
          {loading && [1,2,3,4].map((item,index)=>(
            <div className='h-[320px] rounded-xl bg-slate-200 animate-pulse'></div>
          ))}
          {!loading && carList.length==0 && <div className='font-bold text-3xl'>No Listing</div>} 
        </div>
      </div>
    </div>
  )
}

export default SearchByCategory
