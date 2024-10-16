import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { db } from './../../../configs';
import { CarImages, carListing } from './../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import Service from '@/Shared/Service';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import CarItem from '@/components/CarItem';
import { storage } from './../../../configs/firebaseConfig'; // Import your Firebase storage
import { ref, deleteObject } from "firebase/storage"; // Import deleteObject

const MyListing = ({onUpdate}) => {
    const { user } = useUser();
    const [carList, setCarList] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        if (user) {
            getUserCarListing();
        }
        setLoader(false);
    }, [user]);

    const getUserCarListing = async () => {
        const result = await db
            .select()
            .from(carListing)
            .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
            .where(eq(carListing.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(carListing.id));
        const data = Service.FormatResult(result);
        setCarList(data);
    };

    const deleteCarListing = async (carId, imageUrls) => {
        try {
            await Promise.all(
                imageUrls.map(async (url) => {
                    const imageRef = ref(storage, url); 
                    await deleteObject(imageRef);
                })
            );
    
            await db.delete(CarImages).where(eq(CarImages.carListingId, carId));
            await db.delete(carListing).where(eq(carListing.id, carId));
            getUserCarListing();
        } catch (error) {
            console.error("Error deleting car listing:", error);
        }
    };
    

    return (
        <div className='mt-8'>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl'><strong>My Listing</strong></h2>
                <Link to={'./add-listing'}>
                    <Button onClick={onUpdate}>+ Add New Listing</Button>
                </Link>
            </div>
            {loader ? (
                <> <span>Loading </span><AiOutlineLoading3Quarters className='animate-spin text-lg' /></>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-7'>
                    {carList.map((item, index) => (
                        <div key={index} className='shadow-lg'>
                            <CarItem car={item} />
                            <div className='p-2 gap-2 flex justify-around bg-gray-50 rounded-lg'>
                                <Link to={'/add-listing?mode=edit&id=' + item?.id} className='w-full'>
                                    <Button variant="outline" className="w-full">Edit</Button>
                                </Link>
                                <Button variant='destructive' onClick={() => deleteCarListing(item.id, item.images.map(img => img.imageUrl))}>
                                    <FaTrash />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyListing;
