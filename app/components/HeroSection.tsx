"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

const OPEN_HOUR = 10;
const CLOSE_HOUR = 20;

export default function HeroSection() {
  const [user, setUser] = useState<User | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const bookingLink = user ? "/booking" : "/login";

  const shopStatus = useMemo(() => {
    if (!now) {
      return {
        isOpen: false,
        label: "กำลังตรวจสอบ",
        detail: "เปิดบริการ 10:00 - 20:00 น.",
        nextQueue: "-",
      };
    }

    const hour = now.getHours();
    const minute = now.getMinutes();

    const isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;

    if (!isOpen) {
      const isBeforeOpen = hour < OPEN_HOUR;

      return {
        isOpen: false,
        label: "ปิดบริการ",
        detail: isBeforeOpen
          ? "ร้านจะเปิดให้บริการวันนี้เวลา 10:00 น."
          : "ร้านปิดแล้ว เปิดอีกครั้งพรุ่งนี้เวลา 10:00 น.",
        nextQueue: "10:00 - 20:00 น.",
      };
    }

    const nextQueue = new Date(now);

    if (minute <= 30) {
      nextQueue.setMinutes(30, 0, 0);
    } else {
      nextQueue.setHours(nextQueue.getHours() + 1);
      nextQueue.setMinutes(0, 0, 0);
    }

    if (nextQueue.getHours() >= CLOSE_HOUR) {
      return {
        isOpen: false,
        label: "ปิดรับคิว",
        detail: "ใกล้เวลาปิดร้านแล้ว จองได้อีกครั้งพรุ่งนี้",
        nextQueue: "พรุ่งนี้ 10:00 น.",
      };
    }

    return {
      isOpen: true,
      label: "เปิดบริการ",
      detail: "อัปเดตคิวอัตโนมัติทุก 1 นาที",
      nextQueue: nextQueue.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [now]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-stone-200/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm">
            <Clock size={16} />
            เปิดบริการทุกวัน 10:00 - 20:00 น.
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
            จองคิวตัดผมออนไลน์
            <br className="hidden sm:block" />
            สะดวก รวดเร็ว ไม่ต้องรอนาน
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg lg:mx-0">
            เลือกบริการ เลือกช่างตัดผม และเลือกเวลาที่สะดวกได้ด้วยตัวเอง
            ระบบช่วยจัดการคิวให้ร้านทำงานง่ายขึ้น และลูกค้าเห็นข้อมูลชัดเจนก่อนจอง
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href={bookingLink}
              className="rounded-full bg-amber-800 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-amber-900"
            >
              เริ่มจองคิว
            </Link>

            <Link
              href="/#services"
              className="rounded-full border border-stone-300 bg-white px-7 py-3 text-center text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              ดูบริการทั้งหมด
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:max-w-lg lg:max-w-xl">
            <div>
              <h3 className="text-2xl font-bold text-stone-950">500+</h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">ลูกค้า</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-950">15+</h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                ช่างมืออาชีพ
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-950">4.9</h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                คะแนนรีวิว
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative h-[380px] overflow-hidden rounded-[36px] border border-stone-200 bg-stone-100 shadow-2xl shadow-stone-300/60 sm:h-[480px] lg:h-[560px]">
            <Image
              src="/images/hero-barber.jpg"
              alt="บรรยากาศร้านตัดผม"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent" />

            <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-stone-800 shadow-md backdrop-blur">
              Barber Booking System
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:right-auto sm:w-72">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-stone-500">
                  สถานะร้าน
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      shopStatus.isOpen ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />

                  <h3
                    className={`text-lg font-bold ${
                      shopStatus.isOpen ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {shopStatus.label}
                  </h3>
                </div>
              </div>

              <div className="rounded-full bg-amber-50 p-2 text-amber-800">
                <Clock size={18} />
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-stone-50 px-4 py-3">
              <p className="text-xs text-stone-500">
                {shopStatus.isOpen ? "คิวถัดไป" : "เวลาทำการ"}
              </p>

              <p className="mt-1 text-xl font-bold text-stone-950">
                {shopStatus.nextQueue}
              </p>
            </div>

            <p className="mt-3 text-xs leading-5 text-stone-500">
              {shopStatus.detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}