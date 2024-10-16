import React, { useState, useEffect } from 'react';
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const Features = ({ features }) => {
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (features) {
            setLoading(false); 
        }
    }, [features]);
    const renderSkeleton = () => {
        return (
            <div className='grid grid-cols-2 gap-6 md:grid-cols-3 mt-5 lg:grid-cols-4'>
                {Array(8).fill(0).map((_, index) => (
                    <div key={index} className='flex items-center gap-2 animate-pulse'>
                        <div className='w-5 h-5 bg-gray-300 rounded-full'></div>
                        <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className='mt-6'>
                <div className='p-10 bg-white rounded-xl border shadow-md'>
                    <h2 className='font-medium text-2xl'> Features</h2>
                    {renderSkeleton()} {/* Show skeleton effect while loading */}
                </div>
            </div>
        );
    }

    if (!features || typeof features !== 'object') {
        return <div>No features available</div>;
    }

    return (
        <div className='mt-6'>
            <div className='p-10 bg-white rounded-xl border shadow-md'>
                <h2 className='font-medium text-2xl'> Features</h2>
                <div className='grid grid-cols-2 gap-6 md:grid-cols-3 mt-5 lg:grid-cols-4'>
                    {Object.entries(features).map(([feature, value], index) => (
                        <div key={index} className='flex text-sm items-center gap-2'>
                            <MdOutlineCheckCircleOutline className='w-5 h-5 text-primary' />
                            {feature.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
