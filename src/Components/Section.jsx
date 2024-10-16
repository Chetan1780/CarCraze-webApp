import React from 'react'
import { db } from './../../configs';
import { useEffect,useState } from 'react';
import { carListing,CarImages } from './../../configs/schema';
import { eq ,desc} from 'drizzle-orm';
import Service from '@/Shared/Service';
import { Link } from 'react-router-dom';
const Section = () => {
  useEffect(()=>{
    GetPopularCars();
},[])
const [list, setlist] = useState([])
const GetPopularCars= async ()=>{
  const result = await db.select().from(carListing).innerJoin(CarImages, eq(carListing.id, CarImages.carListingId)).orderBy(desc(carListing.id)).limit(2);
  const randomCars = result.sort(() => 0.5 - Math.random()).slice(0, 2);
    const data = Service.FormatResult(randomCars)
    setlist(data);
    console.log(list);
}
  return (
    <section className='my-20 '>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
          <div className="mx-auto max-w-md text-center lg:text-left">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">CarCraze</h2>
              <p className="mt-4 text-gray-500">
                Connects buyers and sellers for new and used cars, providing a seamless platform for automobile transactions.
              </p>
            </header>
          </div>
        </div>
  
        <div className="lg:col-span-2 lg:py-8">
          <ul className="grid grid-cols-2 gap-4">
            {list.map((car,index)=>(
              <li className='shadow-md'>
              <Link to={`/listing-details/${car?.id}`}>
                <img
                  src={car?.images[0]?.imageUrl}
                  alt=""
                  className="aspect-square w-full rounded object-contain"
                />
  
                <div className="mt-3 flex flex-col justify-start px-5 py-2 text-2xl">
                  <h3
                    className="font-medium text-primary group-hover:underline group-hover:underline-offset-4"
                  >
                    {car?.listingTitle}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">$ {car?.sellingPrice}</p>
                </div>
                </Link>
            </li>
            ))}
            
          </ul>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Section
