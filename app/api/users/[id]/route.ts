import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    if (phone.length !== 10) {
      return NextResponse.json(
        { message: "เบอร์โทรต้องมี 10 หลัก" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        phone,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "ไม่พบผู้ใช้งาน" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "อัปเดตข้อมูลสำเร็จ",

        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" },
      { status: 500 }
    );
  }
}