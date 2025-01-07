import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Captain from '@/models/captain.model';

export async function POST(request: Request) {
  try {
    dbConnect();
    try {
      const { name, email, password,phone,vehicle } = await request.json();

      //show error if any field is empty
      if (!name || !email || !password || !phone || !vehicle) {
        return NextResponse.json(
          { message: 'Please enter all fields' },
          { status: 400 }
        );
      }

      //hansing password
      const hashedpassword = bcrypt.hashSync(password, 10);

      //save the user to the database
      const newCaptain = new Captain({ name, email, password:hashedpassword,phone,vehicle });
      await newCaptain.save();

      //if user is saved successfully, return success message
      return NextResponse.json(
        { message:'Captain created successfully',captain:{newCaptain} },
        { status: 201 }
      );
    } catch (error) {
      //if there is an error, return server error message
      return NextResponse.json(
        { message: `Server Error: ${error}` },
        { status: 500 }
      );
    }
  } catch (error:any) {
    return NextResponse.json(
      { message: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
