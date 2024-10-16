import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Separator  } from "./ui/separator"
import { RiSearch2Line } from "react-icons/ri";
import Data from '@/Shared/Data';
const Search = () => {
    const [cars,setCars] = useState();
    const [make, setMake] = useState();
    const [price, setPrice] = useState();
    return (
        <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]">
            <Select onValueChange={(value)=>setCars(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Old</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>
            <Separator className="hidden md:block" orientation="vertical" />
            <Select onValueChange={(value)=>setMake(value) }>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none">
                    <SelectValue placeholder="Car Brands" />
                </SelectTrigger>
                <SelectContent>
                    {Data.carBrand.map((item,index)=>{
                        return <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                    })}
                </SelectContent>
            </Select>
            <Separator className="hidden md:block" orientation="vertical" />
            <Select onValueChange={(value)=>setPrice(value) }>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                {Data.pricing.map((item,index)=>{
                        return <SelectItem key={index} value={item.amount}>{item.amount}</SelectItem>
                    })}
                </SelectContent>
            </Select>
            <Link to={'/search?cars='+cars+'&make='+make+'&price='+price}>
            <div>
                <RiSearch2Line className='text-[50px] cursor-pointer bg-primary rounded-full p-3 text-white hover:scale-105 ' />
            </div>
            </Link>

        </div>
    )
}

export default Search
