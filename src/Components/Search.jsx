import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { RiSearch2Line } from "react-icons/ri";
import Data from '@/Shared/Data';

const Search = () => {
    const [cars, setCars] = useState();
    const [make, setMake] = useState();
    const [price, setPrice] = useState();

    return (
        <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex flex-col md:flex-row gap-4 md:gap-10 px-5 items-center w-full lg:w-[60%]">
            {/* Cars Select Dropdown */}
            <Select onValueChange={(value) => setCars(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Old</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>

            {/* Separator */}
            <Separator className="hidden md:block" orientation="vertical" />

            {/* Car Brands Select Dropdown */}
            <Select onValueChange={(value) => setMake(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none">
                    <SelectValue placeholder="Car Brands" />
                </SelectTrigger>
                <SelectContent>
                    {Data.carBrand.map((item, index) => (
                        <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Separator */}
            <Separator className="hidden md:block" orientation="vertical" />

            {/* Pricing Select Dropdown */}
            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Data.pricing.map((item, index) => (
                        <SelectItem key={index} value={item.amount}>{item.amount}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Search Icon Button */}
            <Link to={`/search?cars=${cars}&make=${make}&price=${price}`} className="w-full md:w-auto mt-4 md:mt-0">
                <div className="flex justify-center w-full">
                    <RiSearch2Line className="text-[40px] md:text-[50px] cursor-pointer bg-primary rounded-full p-3 text-white hover:scale-105 transition-transform w-full md:w-auto" />
                </div>
            </Link>
        </div>
    );
};

export default Search;
