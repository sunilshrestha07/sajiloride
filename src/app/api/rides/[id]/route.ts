import dbConnect from "@/lib/db";
import Ride from "@/models/rides.model";
import { NextResponse } from "next/server";


//getting the data for the user
export async function GET(request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id: _id} = await params;
    try {
        await dbConnect()
        const rides = await Ride.find({ $or :[{driverId: _id}, {userId: _id}] });
        return NextResponse.json({message:'Rides fetched successfully', rides}, {status: 200})
    } catch (error:any) {
        return NextResponse.json({message: `Error fetching rides: ${error.message}`}, {status: 500});
    }

}
