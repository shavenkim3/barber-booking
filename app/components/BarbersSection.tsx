"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck, Scissors, Sparkles, Star } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function BarbersSection() {
  const [user, setUser] = useState<User | null>(null);

  const barbers = [
    {
      name: "พี่เจมส์",
      role: "ผู้เชี่ยวชาญตัดผมชาย",
      specialty: "ตัดผมชาย",
      experience: "ประสบการณ์ 6 ปี",
      image: "/barbers/james.jpg",
      rating: "4.9",
    },
    {
      name: "พี่ไมค์",
      role: "ผู้เชี่ยวชาญดัดผม",
      specialty: "ดัดผม",
      experience: "ประสบการณ์ 5 ปี",
      image: "/barbers/mike.jpg",
      rating: "4.8",
    },
    {
      name: "พี่เดวิด",
      role: "ผู้เชี่ยวชาญสระผม + เซ็ตทรง",
      specialty: "สระผม + เซ็ตทรง",
      experience: "ประสบการณ์ 4 ปี",
      image: "/barbers/david.jpg",
      rating: "4.9",
    },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <section
      id="barbers"
      className="scroll-mt-24 bg-stone-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              ทีมช่างของเรา
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
              เลือกช่างตัดผมที่คุณชอบ
            </h2>

            <p className="mt-4 text-base leading-7 text-stone-600">
              ลูกค้าสามารถเลือกช่างที่ถนัดสไตล์ต่าง ๆ ได้ตามต้องการ
              ทั้งตัดผมชาย ดัดผม และสระผมพร้อมเซ็ตทรง
            </p>
          </div>

          {!user && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
              กรุณาเข้าสู่ระบบก่อนจองคิวกับช่างตัดผม
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber) => {
            const bookingLink = user
              ? `/booking?barber=${encodeURIComponent(
                  barber.name
                )}&service=${encodeURIComponent(barber.specialty)}`
              : "/login";

            return (
              <div
                key={barber.name}
                className="group overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
              >
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-amber-100 via-stone-200 to-amber-800">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur">
                    <Star size={16} className="fill-amber-500 text-amber-500" />
                    {barber.rating}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-stone-700 backdrop-blur">
                      <Scissors size={14} className="text-amber-800" />
                      {barber.specialty}
                    </div>

                    <h3 className="mt-3 text-3xl font-bold text-white">
                      {barber.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="font-semibold text-amber-800">{barber.role}</p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
                    <Sparkles size={16} className="text-amber-800" />
                    {barber.experience}
                  </div>

                  <Link
                    href={bookingLink}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-900"
                  >
                    <CalendarCheck size={17} />
                    จองกับช่างคนนี้
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}