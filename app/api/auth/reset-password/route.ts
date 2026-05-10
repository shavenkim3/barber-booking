import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import PasswordResetOtp from "@/models/PasswordResetOtp";

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร" },
        { status: 400 }
      );
    }

    await connectDB();

    const otpRecord = await PasswordResetOtp.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json(
        { message: "รหัส OTP ไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      await PasswordResetOtp.deleteMany({ email });

      return NextResponse.json(
        { message: "รหัส OTP หมดอายุแล้ว กรุณาขอรหัสใหม่" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    await PasswordResetOtp.deleteMany({ email });

    return NextResponse.json(
      { message: "เปลี่ยนรหัสผ่านสำเร็จ" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน" },
      { status: 500 }
    );
  }
}