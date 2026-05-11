"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Scissors, Sparkles, Clock3, ArrowRight } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function ServicesSection() {
  const [user, setUser] = useState<User | null>(null);

  const services = [
    {
      icon: Scissors,
      name: "ตัดผมชาย",
      price: "฿250",
      duration: "30 นาที",
      description:
        "บริการตัดผมทรงสุภาพ ทรงแฟชั่น และทรงที่เหมาะกับรูปหน้า",
    },
    {
      icon: Sparkles,
      name: "Fade Cut",
      price: "฿350",
      duration: "45 นาที",
      description:
        "ตัดเฟดเนียนละเอียด เหมาะสำหรับลุคทันสมัยและดูสะอาด",
    },
    {
      icon: Sparkles,
      name: "สระผม + เซ็ตทรง",
      price: "฿180",
      duration: "25 นาที",
      description:
        "สระผมพร้อมเซ็ตทรงให้พร้อมออกไปทำงานหรือออกงาน",
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
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white to-stone-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
            บริการของเรา
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
            เลือกบริการที่เหมาะกับคุณ
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
            บริการตัดผมและดูแลทรงผมสำหรับผู้ชาย
            ออกแบบให้จองง่าย ใช้งานสะดวก
            พร้อมราคาและระยะเวลาชัดเจน
          </p>

        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            const bookingLink = user
              ? `/booking?service=${encodeURIComponent(service.name)}`
              : "/login";

            return (
              <div
                key={service.name}
                className="group rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 transition group-hover:bg-amber-800 group-hover:text-white">
                    <Icon size={28} />
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
                    <Clock3 size={15} />
                    {service.duration}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-stone-950">
                  {service.name}
                </h3>

                <p className="mt-4 text-base leading-7 text-stone-600">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-500">ราคาเริ่มต้น</p>

                    <p className="mt-1 text-3xl font-bold text-amber-800">
                      {service.price}
                    </p>
                  </div>
                </div>

                <Link
                  href={bookingLink}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
                >
                  เลือกบริการ
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}