import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import PasswordResetOtp from "@/models/PasswordResetOtp";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "กรุณากรอกอีเมล" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "ไม่พบบัญชีผู้ใช้นี้" },
        { status: 404 }
      );
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await PasswordResetOtp.deleteMany({ email });

    await PasswordResetOtp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BarberQ" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "รหัส OTP สำหรับกู้คืนรหัสผ่าน BarberQ",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#92400e;">
            กู้คืนรหัสผ่าน BarberQ
          </h2>

          <p>
            รหัส OTP สำหรับเปลี่ยนรหัสผ่านของคุณคือ
          </p>

          <div
            style="
              margin:20px 0;
              padding:16px;
              background:#fef3c7;
              border-radius:12px;
              text-align:center;
            "
          >
            <h1 style="letter-spacing:8px;">
              ${otp}
            </h1>
          </div>

          <p>
            รหัสนี้จะหมดอายุภายใน 5 นาที
          </p>

          <p style="margin-top:24px;">
            หากคุณไม่ได้ร้องขอเปลี่ยนรหัสผ่าน
            กรุณาเพิกเฉยต่ออีเมลนี้
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: "ส่ง OTP ไปยังอีเมลเรียบร้อยแล้ว",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการส่ง OTP",
      },
      {
        status: 500,
      }
    );
  }
}