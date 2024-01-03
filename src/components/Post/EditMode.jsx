import React, { useRef, useState } from 'react'
import { BiSolidSave } from 'react-icons/bi'
import { BsTrashFill } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { db } from '../../firebase/config'
import { doc,updateDoc } from 'firebase/firestore'

const EditMode = ({isPicDeleting,setIsPicDeleting,close,text,isImages,id}) => {
const inputRef=useRef()



const handleSave=async () => {
    const tweetRef=doc(db,'tweets',id)

    try{
    await updateDoc(tweetRef,{textContent:inputRef.current.value,})
    
    if(isPicDeleting){
        await updateDoc(tweetRef,{imageContent:null,})
    }
   }catch(err){
    console.log(err)
   }
    close()
}   

const deletePic = async () => {
    setIsPicDeleting(!isPicDeleting)
    }
  return (
    <><input ref={inputRef} className ='rounded p-1 px-2 text-black' defaultValue={text} type="text"/> 
    <button onClick={handleSave} className='mx-5 p-1 text-green-400 rounded-full hover:bg-gray-500'><BiSolidSave /></button>
    <button onClick={close} className=' p-1 text-red-400 rounded-full hover:bg-gray-500' ><ImCancelCircle/></button>
    {isImages && (
      <button onClick={deletePic} className='absolute end-0 top-20 p-1 bg-white transition text-xl text-red-600 rounded-full hover:bg-gray-500' ><BsTrashFill/></button>
    )}
    </>
  )
}

export default EditMode