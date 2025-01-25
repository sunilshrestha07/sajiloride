import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";

export async function PUT(request: Request, { params }: {params :Promise<{ id: string }>} ) {
  const {id:_id} = await params
  await dbConnect();

  try {
    const validUser = await User.findById(_id);
    if (!validUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { name, email, password, avatar } = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          email,
          password,
          avatar,
        },
      },
      { new: true } // This option returns the updated document
    );

    return NextResponse.json(
      { success: true, message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}
