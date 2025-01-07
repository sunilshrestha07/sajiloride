import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Captain from '@/models/captain.model';

export async function POST(request: Request) {
  try {
    dbConnect();
    const { email, password } = await request.json();

    try {
      if (!email || !password) {
        return NextResponse.json(
          { message: 'Please enter all fields' },
          { status: 400 }
        );
      }

      //check if user exists
      const captainExists = await Captain.findOne({ email: email });

      if (!captainExists) {
        return NextResponse.json(
          { message: 'Captain does not exist' },
          { status: 400 }
        );
      }

      const passwordMatch = bcrypt.compareSync(password, captainExists.password);
      //check if password is correct

      if (!passwordMatch) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 400 }
        );
      }
      //if captain exists and password is correct, return user details but not password
      const { password: pass, ...rest } = captainExists.toObject();
      const token = jwt.sign(
        { captainId: captainExists._id },
        process.env.JWT_SECRET!,
        { expiresIn: '20d' }
      );
      const response = NextResponse.json({
        message: 'Login successfully',
        success: true,
        user: rest,
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 200 * 60 * 60,
      });

      return response;
    } catch (error:any) {
      return NextResponse.json(
        { message: `Server Error: ${error.message}` },
        { status: 500 }
      );
    }
  } catch (error:any) {
    return NextResponse.json(
      { message: `db connection error : ${error.message}` },
      { status: 500 }
    );
  }
}
