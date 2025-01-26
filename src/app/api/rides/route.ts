import dbConnect from '@/lib/db';
import Ride from '@/models/rides.model';
import {NextResponse} from 'next/server';


//to store the ride datas
export async function POST(request: Request) {
  try {
    await dbConnect();
    try {
      const {driverId, userId, pickuplocation, droplocation, distance, price} = await request.json();

      if (!driverId || !userId || !pickuplocation || !droplocation || !distance || !price) {
        return NextResponse.json({message: 'Please enter all fields'}, {status: 400});
      }

      const newRide = new Ride({driverId, userId, pickuplocation, droplocation, distance, price});
      await newRide.save();

      return NextResponse.json({message: 'Ride created successfully', ride: newRide}, {status: 201});
    } catch (error:any) {
      return NextResponse.json({message: `Error creating ride: ${error.message}`}, {status: 500});
    }
  } catch (error:any) {
    return NextResponse.json({message: `Db connecton error: ${error.message}`}, {status: 500});
  }
}

//to fetch all the rides
export async function GET() {
  try {
    await dbConnect();
    const rides = await Ride.find();
    return NextResponse.json({rides}, {status: 200});
  } catch (error:any) {
    return NextResponse.json({message: `Error fetching rides: ${error.message}`}, {status: 500});
  }
}
