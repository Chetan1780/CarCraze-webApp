import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import { db } from '../../configs';
import { CarImages, carListing } from '../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';

const MostSearchedCar = () => {
    const [list, setlist] = useState([]);

    useEffect(() => {
        GetPopularCars();
    }, []);

    const GetPopularCars = async () => {
        const result = await db
            .select()
            .from(carListing)
            .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
            .orderBy(desc(carListing.id))
            .limit(10);
        const data = Service.FormatResult(result);
        setlist(data);
    };

    return (
        <div className='mx-2 md:mx-24'>
            <h2 className='font-bold  border-b-2 w-fit mx-auto text-3xl mt-10 text-center mb-8'>Most Searched Cars</h2>
            <Carousel>
                <CarouselContent>
                    {list.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/1  md:basis-1/2 lg:basis-1/5">
                            <CarItem car={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default MostSearchedCar;
