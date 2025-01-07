import dbConnect from '@/lib/db';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    dbConnect();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}
