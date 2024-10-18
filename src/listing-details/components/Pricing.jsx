import React from 'react'
import { Button } from '@/Components/ui/button';
import { MdOutlineLocalOffer } from "react-icons/md";
import Service from '@/Shared/Service'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
const Pricing = ({car}) => {
  const {user}=useUser();
  const navigation = useNavigate()
  const onMessageOnwerButtonClick= async ()=>{
    //Create a Current User id
    const userId = user.primaryEmailAddress.emailAddress.split('@')[0];
    const ownerUserId = car?.createdBy.split('@')[0];
    try{
        console.log("Enter");
        console.log("userid",userId)
        console.log("imageUrl",user?.imageUrl)
        await Service.CreateSendBirdUser(userId,user?.firstName,user?.imageUrl).then(resp=>{
            console.log(resp);
        })
    } catch{

    }
    // Owner User id
    try{
        console.log("Owner", ownerUserId);
        await Service.CreateSendBirdUser(ownerUserId,car?.userName,car?.userImageUrl).then(resp=>{
            console.log(resp);
        })
    } catch{}
    // Create Channer 
    try {
        await Service.CreateGroupChannel(car?.listingTitle,[userId,ownerUserId]).then(resp=>{
            console.log(resp);
            navigation('/profile');
        })
    } catch (e) {
        
    }
}
  return (
    <div className='p-10 rounded-xl border shadow-md'>
        <h2 className='text-xl'>Our Price</h2>
        {car?.sellingPrice?<h2 className='font-bold text-4xl mt-2'>${car?.sellingPrice}</h2>:
        <h2 className='w-[50%] mt-2 animate-pulse bg-slate-200 h-8'></h2>}
        <Button onClick={onMessageOnwerButtonClick} className="w-full mt-7" size="lg"><MdOutlineLocalOffer  className='text-lg mr-2'/>Make an Offer Price</Button>
    </div>
  )
}

export default Pricing
