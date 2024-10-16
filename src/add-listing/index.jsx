import React from 'react'
import { useState, useEffect } from 'react'
import carDetails from './../Shared/carDetails.json'
import Features from './../Shared/features.json'
import InputField from './components/InputField'
import DropDownField from './components/DropDownField'
import TextAreaField from './components/TextAreaField'
import { Separator } from '@/Components/ui/separator'
import { Checkbox } from '@/Components/ui/checkbox'
import { Button } from '@/Components/ui/button'
import { db } from './../../configs'
import { CarImages, carListing } from './../../configs/schema'
import UploadField from './components/UploadField'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import IconField from './components/IconField'
import Navbar from '@/Components/Navbar'
const AddListing = ({onUpdate}) => {
  const [formData, setformData] = useState([])
  const [isSubmitting, setisSubmitting] = useState(false)
  const [featuresData, setfeaturesData] = useState([])
  const [triggerUploadImages, settriggerUploadImages] = useState(null)
  const [loader, setloader] = useState(false)
  const { user,isSignedIn } = useUser()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const recordId = searchParams.get('id');
  const [carInfo, setcarInfo] = useState()
  useEffect(() => {
    if(!isSignedIn){
      navigate('/login')
    }
    if (mode == 'edit') {
      getListingDetails();
    }
  }, [isSignedIn])
  const getListingDetails = async () => {
    const result = await db.select().from(carListing).leftJoin(CarImages, eq(carListing.id, CarImages.carListingId)).where(eq(carListing.id, recordId))
    const data = Service.FormatResult(result)
    console.log(data);
    setcarInfo(data[0]);
    setformData(data[0])
    setfeaturesData(data[0].features)
    // settriggerUploadImages(data[0]?.id)
  }

  const handleInputChange = (name, value) => {
    setformData((prevdata) => ({
      ...prevdata, [name]: value
    }))
  }
  const handleFeatureChange = (name, value) => {
    setfeaturesData((prevdata) => ({
      ...prevdata, [name]: value
    }))
  }
  const onsubmit = async (e) => {
    setloader(true);
    e.preventDefault();
    if (isSubmitting) return;
    setisSubmitting(true);
    try {

      if (mode == 'edit') {
        const result = await db.update(carListing).set({
          ...formData, features: featuresData, createdBy: user?.primaryEmailAddress?.emailAddress,
          userName:user?.fullName,
          userImageUrl:user?.imageUrl,
          postedOn: Date()
        }).where(eq(carListing.id, recordId)).returning({ id: carListing.id });
        if (result) {
          settriggerUploadImages(result[0]?.id)
        }
      } else {
        const result = await db.insert(carListing).values({
          ...formData, features: featuresData, createdBy: user?.primaryEmailAddress?.emailAddress,
          userName:user?.fullName,
          userImageUrl:user?.imageUrl,
          postedOn: Date()
        }).returning({ id: carListing.id });
        if (result) {
          settriggerUploadImages(result[0]?.id)
        }
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      setisSubmitting(false);
      setloader(false);
      setfeaturesData([])
      setformData([])
      onUpdate();
    }
  }

return (
  <div>
    <Navbar/>
    <div className="px-10 md:px-20 my-10">
      <h2 className='font-bold text-4xl'>Add New Listing</h2>
      <form onSubmit={(e) => onsubmit(e)} action="" className='p-10 border rounded-xl mt-2'>
        {/* Car Details  */}
        <div>
          <h2 className='font-medium text-xl mb-6'>Car Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {carDetails.carDetails.map((item, index) => (
              <div key={index}>
                <label className='text-sm flex gap-3 items-center mb-2'>
                  <IconField icon={item?.icon}/>
                  {item?.label}{item.required && <span className='text-red-700'>*</span>}</label>
                {item.fieldType == 'text' || item.fieldType == 'number' ? <InputField carInfo={carInfo} item={item} handleInputChange={handleInputChange} /> :
                  item.fieldType == 'dropdown' ? <DropDownField handleInputChange={handleInputChange} carInfo={carInfo} item={item} /> : item.fieldType == 'textarea' ? <TextAreaField handleInputChange={handleInputChange} carInfo={carInfo} item={item} /> : null}

              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Features List  */}
          <Separator className='my-8' />
          <div>
            <h2 className='font-medium text-xl mb-6'>Features</h2>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
              {Features.features.map((item, index) => (
                <div className='flex gap-3 itemce'>
                  <Checkbox checked={featuresData?.[item.name]} onCheckedChange={(value) => handleFeatureChange(item.name, value)} />
                  <label className='text-sm'>{item.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* car Images  */}
        <Separator className='my-8' />
        <UploadField carInfo={carInfo} mode={mode} triggerUploadImages={triggerUploadImages}
          setLoader={(v) => { setloader(v); navigate('/profile') }} />
        <div className='mt-10 flex justify-end'>
          <Button disabled={loader} type="submit">
            {!loader ? "Submit" : <AiOutlineLoading3Quarters className='animate-spin text-lg' />
            }
          </Button>
        </div>
      </form>
    </div>
  </div>
)
}

export default AddListing
