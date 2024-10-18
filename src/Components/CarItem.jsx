import React, { useState } from 'react';
import { Separator } from './ui/separator';
import { BsFuelPump } from 'react-icons/bs';
import { SlSpeedometer } from 'react-icons/sl';
import { GiGearStickPattern } from 'react-icons/gi';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const CarItem = ({ car }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    setImageLoaded(true);
  };

  // Check if the aspect ratio is greater than 1 (wide)
  const isWideImage = imageDimensions.width > imageDimensions.height;

  return (
    <Link to={`/listing-details/${car?.id}`}>
      <div className='border rounded-xl   w-[300px] md:w-full bg-white cursor-pointer hover:shadow-md'>
        <h2 className='absolute m-3 bg-primary px-2 rounded-full text-white text-sm'>
          New
        </h2>
        <div className='relative h-[200px] w-full overflow-hidden'> {/* Set fixed height and width */}
        <img
          className='rounded-t-xl h-full w-full object-cover' // Use object-cover to fill the container
          src={car?.images[0]?.imageUrl || "https://via.placeholder.com/150"} // Fallback image if none is available
          alt={car?.listingTitle}
        />
      </div>
        <div className='w-full'>
          <h2 className='font-bold text-black text-lg pl-3 my-2'>
            {car?.listingTitle}
          </h2>
          <Separator />
          <div className='grid grid-cols-3 mt-5 p-2'>
            <div className='flex flex-col items-center gap-1'>
              <BsFuelPump className='text-lg' />
              <h2>{car?.fuelType}</h2>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <SlSpeedometer className='text-lg' />
              <h2>{car?.mileage}</h2>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <GiGearStickPattern className='text-lg' />
              <h2>{car?.transmission}</h2>
            </div>
          </div>
          <Separator className="my-2" />
          <div className='flex w-full px-5 items-center justify-between'>
            <h2 className='font-bold text-xl'>${car?.sellingPrice}</h2>
            <h2 className='text-primary text-sm flex items-center gap-1'>
              View Details
              <TbListDetails />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarItem;
