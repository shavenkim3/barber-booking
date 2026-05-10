"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Mail,
  Phone,
  Scissors,
  UserRound,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type Booking = {
  _id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  barberName: string;
  date: string;
  time: string;
  note?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

export default function MyBookingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchBookings(parsedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchBookings(userId: string) {
    try {
      const res = await fetch(`/api/bookings?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  function getStatusText(status: Booking["status"]) {
    switch (status) {
      case "pending":
        return "รอการยืนยัน";
      case "confirmed":
        return "ยืนยันแล้ว";
      case "completed":
        return "เสร็จสิ้น";
      case "cancelled":
        return "ยกเลิกแล้ว";
      default:
        return status;
    }
  }

  function getStatusClass(status: Booking["status"]) {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-stone-200 text-stone-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-stone-100 text-stone-700";
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              My Bookings
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              ประวัติการจองของฉัน
            </h1>

            <p className="mt-4 max-w-2xl text-stone-600">
              ดูรายการจองคิวร้านตัดผมทั้งหมดของคุณ พร้อมสถานะการจอง
            </p>
          </div>

          {!user && (
            <div className="rounded-[32px] border border-red-100 bg-red-50 p-8 text-red-700">
              กรุณาเข้าสู่ระบบก่อนดูประวัติการจอง
            </div>
          )}

          {user && (
            <div className="mb-8 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-800 text-lg font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-stone-950">
                      {user.name}
                    </h2>

                    <div className="mt-2 flex flex-col gap-1 text-sm text-stone-500 sm:flex-row sm:gap-4">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {user.email}
                      </span>

                      {user.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {user.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800">
                  จำนวนการจอง {bookings.length} รายการ
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="rounded-[32px] border border-stone-200 bg-white p-8 text-stone-600 shadow-sm">
              กำลังโหลดข้อมูลการจอง...
            </div>
          )}

          {!loading && user && bookings.length === 0 && (
            <div className="rounded-[32px] border border-stone-200 bg-white p-8 text-stone-600 shadow-sm">
              ยังไม่มีประวัติการจอง
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <div className="grid gap-5">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-stone-950">
                          {booking.serviceName}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-stone-500">
                        {booking.servicePrice} • {booking.serviceDuration}
                      </p>

                      <div className="mt-5 grid gap-3 text-sm text-stone-600 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <UserRound size={16} className="text-amber-800" />
                          {booking.barberName}
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <CalendarDays size={16} className="text-amber-800" />
                          {booking.date}
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <Clock size={16} className="text-amber-800" />
                          {booking.time} น.
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <Scissors size={16} className="text-amber-800" />
                          BarberQ
                        </div>
                      </div>

                      {booking.note && (
                        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                          หมายเหตุ: {booking.note}
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-stone-400">
                      จองเมื่อ{" "}
                      {new Date(booking.createdAt).toLocaleDateString("th-TH")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}