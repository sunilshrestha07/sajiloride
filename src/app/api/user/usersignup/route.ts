import dbConnect from '@/lib/db';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    dbConnect();
    try {
      const { name, email, password } = await request.json();

      //show error if any field is empty
      if (!name || !email || !password) {
        return NextResponse.json(
          { message: 'Please enter all fields' },
          { status: 400 }
        );
      }

      //hansing password
      const hashedpassword = bcrypt.hashSync(password, 10);

      //save the user to the database
      const newUser = new User({ name, email, password:hashedpassword });
      await newUser.save();

      //if user is saved successfully, return success message
      return NextResponse.json(
        { message:'User created successfully',user:{newUser} },
        { status: 201 }
      );
    } catch (error) {
      //if there is an error, return server error message
      return NextResponse.json(
        { message: `Server Error: ${error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: `dbconnection problem ${error}` },
      { status: 500 }
    );
  }
}
