"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
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
  role?: string;
};

type Booking = {
  _id: string;
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
};

export default function AdminPage() {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const parsedUser: User = JSON.parse(savedUser);

    if (parsedUser.role !== "admin") {
      window.location.href = "/";
      return;
    }

    setAdminUser(parsedUser);
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();

      if (res.ok) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  async function updateStatus(
    bookingId: string,
    status: Booking["status"]
  ) {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.log(error);
    }
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

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                Admin Dashboard
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
                จัดการคิวร้านตัดผม
              </h1>

              <p className="mt-4 max-w-2xl text-stone-600">
                ดูรายการจองทั้งหมด และอัปเดตสถานะการจองของลูกค้า
              </p>
            </div>

            {adminUser && (
              <div className="rounded-3xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-stone-500">เข้าสู่ระบบในฐานะ</p>
                <p className="mt-1 font-bold text-stone-950">
                  {adminUser.name}
                </p>
                <p className="text-sm text-amber-800">Admin</p>
              </div>
            )}
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-stone-500">คิวทั้งหมด</p>
              <h3 className="mt-3 text-3xl font-bold text-stone-950">
                {totalBookings}
              </h3>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-stone-500">รอการยืนยัน</p>
              <h3 className="mt-3 text-3xl font-bold text-amber-800">
                {pendingBookings}
              </h3>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-stone-500">ยืนยันแล้ว</p>
              <h3 className="mt-3 text-3xl font-bold text-green-700">
                {confirmedBookings}
              </h3>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-stone-500">เสร็จสิ้น</p>
              <h3 className="mt-3 text-3xl font-bold text-stone-800">
                {completedBookings}
              </h3>
            </div>
          </div>

          {loading && (
            <div className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
              กำลังโหลดข้อมูล...
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
              ยังไม่มีรายการจอง
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <div className="grid gap-5">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold text-stone-950">
                          {booking.serviceName}
                        </h2>

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
                          {booking.customerName}
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <Phone size={16} className="text-amber-800" />
                          {booking.customerPhone}
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <CalendarDays size={16} className="text-amber-800" />
                          {booking.date}
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-stone-50 px-4 py-3">
                          <Clock size={16} className="text-amber-800" />
                          {booking.time} น.
                        </div>
                      </div>

                      <div className="mt-3 grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
                        <div className="rounded-2xl bg-stone-50 px-4 py-3">
                          ช่างตัดผม:{" "}
                          <span className="font-semibold">
                            {booking.barberName}
                          </span>
                        </div>

                        <div className="rounded-2xl bg-stone-50 px-4 py-3">
                          อีเมล:{" "}
                          <span className="font-semibold">
                            {booking.customerEmail}
                          </span>
                        </div>
                      </div>

                      {booking.note && (
                        <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                          หมายเหตุ: {booking.note}
                        </div>
                      )}
                    </div>

                    <div className="w-full lg:w-[220px]">
                      <div className="rounded-3xl bg-stone-50 p-4">
                        <p className="text-sm font-semibold text-stone-700">
                          เปลี่ยนสถานะ
                        </p>

                        <div className="mt-4 grid gap-2">
                          <button
                            onClick={() =>
                              updateStatus(booking._id, "confirmed")
                            }
                            className="rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                          >
                            ยืนยันคิว
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(booking._id, "completed")
                            }
                            className="rounded-2xl bg-stone-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
                          >
                            เสร็จสิ้น
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(booking._id, "cancelled")
                            }
                            className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                          >
                            ยกเลิกคิว
                          </button>
                        </div>
                      </div>
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