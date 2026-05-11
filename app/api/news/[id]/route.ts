import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import News from "@/models/News";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, category, description, imageUrl, isFeatured } =
      await req.json();

    if (!title || !category || !description) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลข่าวสารให้ครบ" },
        { status: 400 }
      );
    }

    await connectDB();

    const news = await News.findByIdAndUpdate(
      id,
      {
        title,
        category,
        description,
        imageUrl,
        isFeatured: Boolean(isFeatured),
      },
      { new: true }
    );

    if (!news) {
      return NextResponse.json(
        { message: "ไม่พบข่าวสารนี้" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "แก้ไขข่าวสารสำเร็จ",
        news,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "แก้ไขข่าวสารไม่สำเร็จ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json(
        { message: "ไม่พบข่าวสารนี้" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "ลบข่าวสารสำเร็จ" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "ลบข่าวสารไม่สำเร็จ" },
      { status: 500 }
    );
  }
}