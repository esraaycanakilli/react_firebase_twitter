import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { BsCardImage } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from './Spinner';


const Form = ({user}) => {

const [isLoading,setIsLoading]=useState(false)

const tweetCol=collection(db,"tweets")

const uploadImage=async (file)=>{
    if(!file){
        return null
    }
    const fileRef=ref(storage,file.name.concat(v4()))
    
    return await uploadBytes(fileRef,file)
    .then((res)=>getDownloadURL(res.ref))
}

const handleSubmit=async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    const textContent=e.target[0].value
    const imageContent=e.target[1].files[0]

    if(!textContent && !imageContent){
        return toast.info('Lütfen tweet içeriği ekleyin...')
    }

    const imageURL=await uploadImage(imageContent)
    console.log(imageURL)
    
    await addDoc(tweetCol,{
        textContent,
        imageContent:imageURL,
        createdAt:serverTimestamp(),
        user:{
            id:user.uid,
            name:user.displayName,
            photo:user.photoURL,
        },
        likes:[],
        isEdited:false,
    })

    setIsLoading(false)
}

  return (
    <form onSubmit={handleSubmit} className='flex gap-3 p-4 border-b-[1px] border-gray-700'>
        <img className='rounded-full h-[35px] md:h-[45px] mt-1'src={user?.photoURL}/>
        <div className='w-full'>
            <input className='w-full bg-transparent my-2 outline-none text-normal md:text-lg'
            placeholder='Neler Oluyor?' type="text" />
        <div className=' flex justify-between items-center'> 
            <label  className='cursor-pointer hover:bg-gray-800 text-lg transition p-4 rounded-full'htmlFor="image">
                <BsCardImage />
            </label>
        <input className='hidden ' id="image" type="file" />
        <button disabled={isLoading} className='bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800 '>
            {isLoading ?<Spinner /> : 'Tweetle'}
        </button>
        </div>
        </div>
    </form>
  )
}

export default Form