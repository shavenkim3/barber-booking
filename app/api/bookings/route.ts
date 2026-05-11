import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      serviceName,
      servicePrice,
      serviceDuration,
      barberName,
      date,
      time,
      note,
    } = await req.json();

    if (
      !userId ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !serviceName ||
      !servicePrice ||
      !serviceDuration ||
      !barberName ||
      !date ||
      !time
    ) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลการจองให้ครบ" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingBooking = await Booking.findOne({
      barberName,
      date,
      time,
      status: { $ne: "cancelled" },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "ช่วงเวลานี้ถูกจองแล้ว กรุณาเลือกเวลาอื่น" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      userId,
      customerName,
      customerEmail,
      customerPhone,
      serviceName,
      servicePrice,
      serviceDuration,
      barberName,
      date,
      time,
      note,
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "จองคิวสำเร็จ",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการจองคิว" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const date = searchParams.get("date");
    const barberName = searchParams.get("barberName");

    const filter: {
      userId?: string;
      date?: string;
      barberName?: string;
      status?: { $ne: string };
    } = {
      status: { $ne: "cancelled" },
    };

    if (userId) filter.userId = userId;
    if (date) filter.date = date;
    if (barberName) filter.barberName = barberName;

    const bookings = await Booking.find(filter).sort({
      createdAt: -1,
    });

    const bookedTimes = bookings.map((booking) => booking.time);

    return NextResponse.json(
      {
        bookings,
        bookedTimes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลการจอง" },
      { status: 500 }
    );
  }
}