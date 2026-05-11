import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  try {
    await connectDB();

    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "ดึงข้อมูลข่าวสารไม่สำเร็จ" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, category, description, imageUrl, isFeatured } =
      await req.json();

    if (!title || !category || !description) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลข่าวสารให้ครบ" },
        { status: 400 }
      );
    }

    await connectDB();

    const news = await News.create({
      title,
      category,
      description,
      imageUrl,
      isFeatured: Boolean(isFeatured),
    });

    return NextResponse.json(
      {
        message: "เพิ่มข่าวสารสำเร็จ",
        news,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "เพิ่มข่าวสารไม่สำเร็จ" },
      { status: 500 }
    );
  }
}