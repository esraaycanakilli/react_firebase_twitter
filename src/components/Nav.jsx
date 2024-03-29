import React from 'react'
import { navSections } from '../constants'
import UserLoader from './UserLoader'
import { BiDoorOpen } from 'react-icons/bi'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'


const Nav = ({user}) => {
    const navigate= useNavigate()
    
  return (
    <nav className='flex flex-col justify-between items-end p-2 py-4'> 
        <div>
            <img  className="w-14 mb-4" src="x-logoo.webp" alt="x-logo" />
            {navSections.map((i)=>(
                <div key={i.title} className='flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#80808045]'>
                    {i.icon}
                    <span className='hidden md:block'>{i.title}</span>
                </div>
            ))}
        </div>
        <div>
            {!user ? (
            <UserLoader/>
            ) : (
            <div className='flex flex-col gap-5'>
                <div className='flex gap-2 items-center'>
                <img  className="w-12 h-12 rounded-full"src={user.photoURL} />
                <p className='hidden md:block' >{user.displayName}</p>
                </div>
                
                <button 
                onClick={()=>signOut(auth).then((navigate("/")))}
                className='flex justify-center items-center gap-2 p-1 bg-gray-700 rounded text-2xl md:text-[14px]'>
                    <BiDoorOpen/>
                    <span className='hidden md:block text-base' 
                    >Çıkış Yap</span></button>
            </div>)}
        </div>
    </nav>
  )
}

export default Nav