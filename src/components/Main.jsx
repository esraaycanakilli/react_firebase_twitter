import React, { useEffect, useState } from 'react'
import Form from './Form'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Loader from './Post/Loader'
import Post from './Post'
import { db } from '../firebase/config'

const Main = ({user}) => {
  const tweetsCol=collection(db,'tweets')
  const [tweets,setTweets]=useState(null)

  useEffect(()=>{
    const options = query(tweetsCol, orderBy('createdAt', 'desc'));
   
    onSnapshot(options,(snapshot)=>{
      const tempTweets=[]
      snapshot.forEach((doc)=>
      tempTweets.push({id:doc.id,...doc.data()})
      )
      setTweets(tempTweets)
    })
  },[])
  return (
    <main className='border border-gray-700 overflow-y-auto'>
      <header className='font-bold p-4 border-b-[1px] border-gray-700'>
      Anasayfa
    </header>
    <Form  user={user}/>
    {
      !tweets ?<Loader/> : tweets.map((tweet)=><Post key={tweet.id} tweet={tweet}/>)
    }
    </main>
    
    )
}

export default Main