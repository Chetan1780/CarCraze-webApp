import { CarImages, carListing } from './../../configs/schema';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from './../../configs';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
const SearchByOptions = () => {
    const [searchParams] = useSearchParams();
    const [carList,setcarList] = useState([])
    const [loading, setloading] = useState(true)
    const cars = searchParams.get('cars');
    const make = searchParams.get('make');
    const price = searchParams.get('price');
    useEffect(()=>{
        getCarList();
        setloading(false)
    },[])
    const getCarList= async()=>{
        const result = await db.select().from(carListing).leftJoin(CarImages,eq(carListing.id,CarImages.carListingId)).where(cars!=undefined&&eq(carListing.condition,cars)).where(make!=undefined&&eq(carListing.make,make))
        const data = Service.FormatResult(result);
        setcarList(data);
    }
  return (
    <div>
    <Header />
    <div className='p-16 bg-black flex justify-center'>
      <Search />
    </div>
    <div className=' p-10 md:px-20'>
      <h2 className='font-bold text-4xl '>Search Result</h2>
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

export default SearchByOptions
