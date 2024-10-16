import React, { useEffect } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './../../../configs/firebaseConfig';
import { db } from './../../../configs';
import { CarImages } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
const UploadField = ({triggerUploadImages,setLoader,carInfo,mode}) => {
    const [selectedFile, setselectedFile] = useState([])
    const [editImages, seteditImages] = useState([])
    useEffect(() => {
        if(mode=="edit"){
            seteditImages([])
            carInfo?.images.forEach((image,index)=>{
                seteditImages(prev=>[...prev,image?.imageUrl])
                console.log(image)
            })
        }
    }, [carInfo])
    
    useEffect(()=>{
        if(triggerUploadImages){
            UploadImagesToServer();
        }
    },[triggerUploadImages])
    const onFileSelected = (e) => {
        const files = e.target.files
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            setselectedFile((prev) => [...prev, file])
        }
        console.log(selectedFile)
    }
    const removeImage = (image, index) => {
        const result = selectedFile.filter((item) => item != image);
        setselectedFile(result);
    }
    const removeImageDb = async (image,index)=>{
        console.log(image)
        console.log(CarImages.id)
        console.log( index);
        const result = await db.delete(CarImages).where(eq(CarImages.id,carInfo?.images[index].id))
        const imageList = editImages.filter(item=>item!=image);
        seteditImages(imageList);
    }
    const UploadImagesToServer = () => {
        setLoader(true);
        selectedFile.forEach((file) => {
            const fileName = Date.now() + '.jpeg';
            const storageRef = ref(storage, 'carMarket-place/' + fileName);
            console.log(storageRef)
            const metaData = {
                contentType: 'image/jpeg'
            }
            uploadBytes(storageRef, file, metaData)
                .then((snapshot) => {
                    console.log("Uploaded Files");
                })
                .then(resp => {
                    return getDownloadURL(storageRef);
                })
                .then(async (downloadUrl) => {
                    await db.insert(CarImages).values({
                        imageUrl:downloadUrl,
                        carListingId:triggerUploadImages
                    })
                    setLoader(false); 
                })
                .catch((error) => {
                    console.error("Upload failed:", error);
                });
        })
    }

    return (
        <div>
            <h2 className='font-medium text-xl mb-6'>Upload Car Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {mode=='edit' && editImages.map((image, index) => (
                    <div key={index}>
                        <IoCloseCircle className='absolute cursor-pointer m-2 text-lg bg-black text-white' onClick={() => removeImageDb(image, index)} />
                        <img src={image} className='w-full rounded-xl h-[130px] object-contain' alt="" srcset="" />
                    </div>
                ))}
                {selectedFile.map((image, index) => (
                    <div key={index}>
                        <IoCloseCircle className='absolute cursor-pointer m-2 text-lg bg-black text-white' onClick={() => removeImage(image, index)} />
                        <img src={URL.createObjectURL(image)} className='w-full rounded-xl h-[130px] object-contain' alt="" srcset="" />
                    </div>
                ))}
                <label htmlFor="upload-Images">
                    <div className='border rounded-xl  hover:shadow-md cursor-pointer border-dotted border-primary bg-blue-100 p-10'>
                        <h2 className='text-lg text-center text-primary p-4'>+</h2>
                    </div>
                </label>
                <input onChange={(e) => { onFileSelected(e) }} type="file" name="" className='opacity-0' id="upload-Images" multiple={true} />
            </div>
        </div>
    )
}

export default UploadField
