import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/DetailHeader';
import { useParams } from 'react-router-dom';
import { CarImages, carListing } from './../../../configs/schema';
import { db } from './../../../configs';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OwnerDetail from '../components/OwnerDetail';
import Footer from '@/components/Footer';
import FinancialCalculator from '../components/FinancialCalculator';
import MostSearchedCar from '@/components/MostSearchedCar';
import Loading from './Loading';
import Navbar from '@/components/Navbar';
const ListingDetails = () => {
    const { id } = useParams();
    const [carDetail, setcarDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCarDetails();
    }, [id]);

    const getCarDetails = async () => {
        if (!id) return;

        setLoading(true);

        try {
            const result = await db.select()
                .from(carListing)
                .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
                .where(eq(carListing.id, id));

            const data = Service.FormatResult(result);
            setcarDetail(data[0]);
        } catch (error) {
            console.error('Error fetching car details:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <Navbar />
            <div className='p-10 md:px-20'>
                {loading ? (
                    <Loading/>
                ) : (
                    <>
                        <DetailHeader carDetail={carDetail} />
                        <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                            <div className='md:col-span-2'>
                                <ImageGallery car={carDetail} />
                                <Description car={carDetail} />
                                <Features features={carDetail.features} />
                                <FinancialCalculator />
                            </div>
                            <div className=''>
                                <Pricing car={carDetail} />
                                <Specification carDetail={carDetail} />
                                <OwnerDetail car={carDetail} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='mb-10'>
            <MostSearchedCar />
            </div>
            <Footer />
        </div>
    );
};

export default ListingDetails;
