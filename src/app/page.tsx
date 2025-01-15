'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from '@/components/Chat';

interface LocationInfo {
  address_line1: string;
  address_line2: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export default function Page() {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>([]);
  const [singleLocation, setSingleLocation] = useState<LocationInfo | null>(null);
  const [coordinates, setCoordinates] = useState([]);

  const getAllUsers = async () => {
    const { data } = await axios.get('/api/user/getallusers');
    setAllUsers(data.users);
  };
  const getalllocation = async () => {
    const response = await axios.get(
      'https://api.geoapify.com/v1/geocode/autocomplete?text=Kathmandu&apiKey=5d559ea3b78942d39c8fbf7428f99628'
    );
    const features = response.data.features;

    // Extract specific data and store it in state
    const locations: LocationInfo[] = features.map((feature: any) => ({
      address_line1: feature.properties.address_line1,
      address_line2: feature.properties.address_line2,
      city: feature.properties.city,
      country: feature.properties.country,
      lat: feature.properties.lat,
      lon: feature.properties.lon,
    }));

    setLocationInfo(locations);
    // console.log(locations)
  };

  //get the routes
  const findRoutes = async () => {
    try {
      const res = await axios.get(
        'https://api.geoapify.com/v1/routing?waypoints=27.69399935,85.28526227585166|28.209538,83.991402&mode=drive&apiKey=5d559ea3b78942d39c8fbf7428f99628'
      );

      // Extract the coordinates
      const extractedCoordinates = res.data.features[0]?.geometry?.coordinates[0] || [];

      // Set state with coordinates
      // Map the coordinates to fit the Polyline's format: [{ latitude, longitude }]
      const formattedCoordinates = extractedCoordinates.slice(0,10)
      .map(coord => ({
        latitude: coord[1], // Latitude is the second element
        longitude: coord[0], // Longitude is the first element
      }));

      setCoordinates(formattedCoordinates);
      console.log(formattedCoordinates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getalllocation();
    findRoutes();
  }, []);

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
  };

  const handleCaptainSignup = async () => {
    try {
      const res = await axios.post('/api/captain/captainsignup', formData);
      alert('success');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationClick = (location: LocationInfo) => {
    setSingleLocation(location);
    console.log(location);
  };

  return (
    <div>
      <h1>All the users</h1>
      {allUsers.map((user) => (
        <div key={user._id}>{user.name}</div>
      ))}
      <div>
        <button onClick={handleCaptainSignup}>captain login</button>
      </div>
      {/* <div className="">
      <ul>
        {locationInfo.map((location, index) => (
          <li
            key={index}
            onClick={() => handleLocationClick(location)} // Set single location on click
            style={{ cursor: 'pointer', marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}
          >
            <p><strong>Address Line 1:</strong> {location.address_line1}</p>
            <p><strong>Address Line 2:</strong> {location.address_line2}</p>
            <p><strong>City:</strong> {location.city}</p>
            <p><strong>Country:</strong> {location.country}</p>
            <p><strong>Latitude:</strong> {location.lat}</p>
            <p><strong>Longitude:</strong> {location.lon}</p>
          </li>
        ))}
      </ul>
      </div> */}
      <div className="">
        <Chat/>
      </div>
    </div>
  );
}
