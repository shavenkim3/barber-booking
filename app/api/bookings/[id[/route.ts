import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ไม่พบรหัสการจอง" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { message: "กรุณาระบุสถานะ" },
        { status: 400 }
      );
    }

    const allowedStatus = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { message: "สถานะไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { message: "ไม่พบรายการจองนี้" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "อัปเดตสถานะสำเร็จ",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตสถานะ" },
      { status: 500 }
    );
  }
}