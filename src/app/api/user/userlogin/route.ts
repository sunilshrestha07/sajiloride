import dbConnect from '@/lib/db';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      const userExists = await User.findOne({ email: email });

      if (!userExists) {
        return NextResponse.json(
          { message: 'User does not exist' },
          { status: 400 }
        );
      }

      const passwordMatch = bcrypt.compareSync(password, userExists.password);
      //check if password is correct

      if (!passwordMatch) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 400 }
        );
      }
      //if user exists and password is correct, return user details but not password
      const { password: pass, ...rest } = userExists.toObject();
      const token = jwt.sign(
        { userId: userExists._id },
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
    } catch (error) {
      return NextResponse.json(
        { message: `Server Error: ${error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message:`db connection error ${error}` },
      { status: 500 }
    );
  }
}
