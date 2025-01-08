'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Page() {
  const [allUsers, setAllUsers] = useState<any>([])

  const getAllUsers = async () => {
    const { data } = await axios.get('/api/user/getallusers')
    setAllUsers(data.users)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const formData = {
    name: 'suneel',
    email: 'suneessssl@gmail.com',
    phone: '1234567890',
    password: 'password',
    vehicle: {
      color: 'red',
      plate: 'ABC123',
      vehicleType: 'car',
    },
  }

  const handleCaptainSignup = async () => {
    try {
      const res = await axios.post('/api/captain/captainsignup', formData)
      alert("success")
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>All the users</h1>
      {allUsers.map((user) => (
        <div key={user._id}>{user.name}</div>
      ))}
      <div>
        <button onClick={handleCaptainSignup}>captain login</button>
      </div>
    </div>
  )
}

