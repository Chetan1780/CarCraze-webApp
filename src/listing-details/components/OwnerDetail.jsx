import React from 'react'
import { Button } from '@/Components/ui/button'
import Service from '@/Shared/Service'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
const OwnerDetail = ({ car }) => {
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
        <div className='p-6 border rounded-xl shadow-md'>
            <h2 className='font-medium w-fit mx-auto border-b-2 p-2 border-primary text-center text-2xl mb-3'>Owner Details</h2>
            <div className='flex items-center gap-8'>
                <img src={car?.userImageUrl} className='w-[70px] h-[70px] rounded-full' alt="" />
                <h2 className='mt-2 font-bold uppercase text-xl'>{car?.userName}</h2>
            </div>
            <h2 className='mt-2 pl-4 text-gray-400'>{car?.createdBy}</h2>
            <Button onClick={onMessageOnwerButtonClick} className="w-full mt-6">Make a Deal</Button>
        </div>
    )
}

export default OwnerDetail
