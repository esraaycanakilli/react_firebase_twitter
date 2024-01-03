import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {
    const[isAuth,setIsAuth]=useState(null)
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
           if(user){
            setIsAuth(true)
           }else{
            setIsAuth(false)
           } 
        })
    },[])

    if(isAuth===false) {
     return <Navigate to={'/'} raplace />
} 
     return  <Outlet/>
}

export default ProtectedRoute