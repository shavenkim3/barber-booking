"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Scissors,
  UserRound,
  Trash2,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type Booking = {
  _id: string;
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

export default function MyBookingsSection() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelBooking(bookingId: string) {
    const confirmCancel = confirm("คุณต้องการยกเลิกการจองนี้ใช่ไหม?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "ยกเลิกการจองไม่สำเร็จ");
        return;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      setMessage("ยกเลิกการจองสำเร็จ");
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาดในการยกเลิกการจอง");
    }
  }

  function getStatusText(status: Booking["status"]) {
    if (status === "pending") return "รอการยืนยัน";
    if (status === "confirmed") return "ยืนยันแล้ว";
    if (status === "completed") return "เสร็จสิ้น";
    if (status === "cancelled") return "ยกเลิกแล้ว";
    return status;
  }

  function getStatusClass(status: Booking["status"]) {
    if (status === "pending") return "bg-amber-100 text-amber-800";
    if (status === "confirmed") return "bg-green-100 text-green-700";
    if (status === "completed") return "bg-stone-200 text-stone-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-stone-100 text-stone-700";
  }

  if (!user) return null;

  return (
    <section className="mt-10 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
          My Bookings
        </span>

        <h2 className="mt-4 text-2xl font-bold text-stone-950">
          รายละเอียดการจองของฉัน
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          ดูรายการจอง วันที่ เวลา ช่างตัดผม และสถานะการจองของคุณ
        </p>
      </div>

      {message && (
        <div className="mb-5 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {message}
        </div>
      )}

      {loading && (
        <div className="rounded-2xl bg-stone-50 p-5 text-sm text-stone-500">
          กำลังโหลดข้อมูลการจอง...
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="rounded-2xl bg-stone-50 p-5 text-sm text-stone-500">
          ยังไม่มีรายการจอง
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid gap-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-[28px] border border-stone-200 bg-stone-50 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-stone-950">
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

                  <div className="mt-4 grid gap-3 text-sm text-stone-600 sm:grid-cols-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3">
                      <UserRound size={16} className="text-amber-800" />
                      {booking.barberName}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3">
                      <CalendarDays size={16} className="text-amber-800" />
                      {booking.date}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3">
                      <Clock size={16} className="text-amber-800" />
                      {booking.time} น.
                    </div>
                  </div>

                  {booking.note && (
                    <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                      หมายเหตุ: {booking.note}
                    </p>
                  )}
                </div>

                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    ยกเลิกการจอง
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}