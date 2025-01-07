'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function page() {
  const [allUsers,setAllUsers] = useState<any>([])
  const getallusers = async()=>{
    const data = await axios.get('/api/user/getallusers')
    console.log(data)
    setAllUsers(data.data.users)
  }

 useEffect(()=>{
  getallusers()
 },[1])
  return (
    <div className="">
      <h1>All the users</h1>
      {allUsers.map((user)=>{
        return <div key={user._id}>{user.name}</div>
      })}
    </div>
  )
}
