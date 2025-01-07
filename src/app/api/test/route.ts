import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ message: "This is test route" });
    } catch (error) {
        return NextResponse.json({ message: `Server Error: ${error}` },{status: 500 });
    }
}