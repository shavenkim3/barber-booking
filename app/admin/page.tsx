"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  History,
  Mail,
  Newspaper,
  Phone,
  Scissors,
  Search,
  ShieldCheck,
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

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"current" | "history">("current");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.role !== "admin") {
      window.location.href = "/";
      return;
    }

    setUser(parsedUser);
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
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(bookingId: string, status: Booking["status"]) {
    setMessage("");

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "อัปเดตสถานะไม่สำเร็จ");
        return;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );

      setMessage("อัปเดตสถานะสำเร็จ");
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
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

  const today = new Date().toISOString().split("T")[0];

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        booking.customerName.toLowerCase().includes(keyword) ||
        booking.customerEmail.toLowerCase().includes(keyword) ||
        booking.customerPhone.includes(keyword) ||
        booking.serviceName.toLowerCase().includes(keyword) ||
        booking.barberName.toLowerCase().includes(keyword) ||
        booking.date.includes(keyword) ||
        booking.time.includes(keyword);

      const matchStatus =
        statusFilter === "all" || booking.status === statusFilter;

      const isHistory =
        booking.status === "completed" ||
        booking.status === "cancelled" ||
        booking.date < today;

      const matchView = viewMode === "history" ? isHistory : !isHistory;

      return matchSearch && matchStatus && matchView;
    });
  }, [bookings, search, statusFilter, viewMode, today]);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "cancelled"
  ).length;

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                <ShieldCheck size={16} />
                Admin Dashboard
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
                จัดการข้อมูลร้าน
              </h1>

              <p className="mt-4 max-w-2xl text-stone-600">
                จัดการรายการจอง ประวัติย้อนหลัง และข่าวสารของร้านตัดผม
              </p>
            </div>

            {user && (
              <div className="rounded-3xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-stone-500">ผู้ดูแลระบบ</p>
                <p className="mt-1 font-bold text-stone-950">{user.name}</p>
              </div>
            )}
          </div>

          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                  <CalendarDays size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-stone-950">
                    จัดการการจอง
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    ดูรายการจองทั้งหมด อัปเดตสถานะ และตรวจสอบประวัติย้อนหลัง
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/admin/news"
              className="group rounded-[32px] border border-amber-200 bg-gradient-to-br from-amber-800 to-stone-950 p-6 text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Newspaper size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">จัดการข่าวสาร</h2>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    เพิ่ม แก้ไข ลบข่าวสาร โปรโมชัน และประกาศของร้าน
                  </p>

                  <span className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-amber-800 transition group-hover:bg-amber-100">
                    ไปหน้าจัดการข่าวสาร
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <SummaryCard title="ทั้งหมด" value={totalBookings} />
            <SummaryCard
              title="รอการยืนยัน"
              value={pendingBookings}
              color="text-amber-800"
            />
            <SummaryCard
              title="ยืนยันแล้ว"
              value={confirmedBookings}
              color="text-green-700"
            />
            <SummaryCard
              title="เสร็จสิ้น"
              value={completedBookings}
              color="text-stone-800"
            />
            <SummaryCard
              title="ยกเลิกแล้ว"
              value={cancelledBookings}
              color="text-red-700"
            />
          </div>

          <div className="mt-8 rounded-[32px] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setViewMode("current")}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  viewMode === "current"
                    ? "bg-amber-800 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                รายการจองปัจจุบัน
              </button>

              <button
                onClick={() => setViewMode("history")}
                className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  viewMode === "history"
                    ? "bg-stone-950 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                <History size={16} />
                ประวัติการจองย้อนหลัง
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
              <div className="flex items-center gap-3 rounded-2xl border border-stone-300 px-4 py-3">
                <Search size={18} className="text-stone-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาชื่อลูกค้า อีเมล เบอร์โทร บริการ ช่าง วันที่ หรือเวลา"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="pending">รอการยืนยัน</option>
                <option value="confirmed">ยืนยันแล้ว</option>
                <option value="completed">เสร็จสิ้น</option>
                <option value="cancelled">ยกเลิกแล้ว</option>
              </select>
            </div>
          </div>

          {message && (
            <div className="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              {message}
            </div>
          )}

          {loading && (
            <div className="mt-8 rounded-[32px] border border-stone-200 bg-white p-8 text-stone-600 shadow-sm">
              กำลังโหลดข้อมูลการจอง...
            </div>
          )}

          {!loading && filteredBookings.length === 0 && (
            <div className="mt-8 rounded-[32px] border border-stone-200 bg-white p-8 text-center text-stone-600 shadow-sm">
              ไม่พบรายการจอง
            </div>
          )}

          {!loading && filteredBookings.length > 0 && (
            <div className="mt-8 grid gap-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex-1">
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
                        <InfoBox
                          icon={<UserRound size={16} />}
                          label="ลูกค้า"
                          value={booking.customerName}
                        />
                        <InfoBox
                          icon={<Scissors size={16} />}
                          label="ช่าง"
                          value={booking.barberName}
                        />
                        <InfoBox
                          icon={<CalendarDays size={16} />}
                          label="วันที่"
                          value={booking.date}
                        />
                        <InfoBox
                          icon={<Clock size={16} />}
                          label="เวลา"
                          value={`${booking.time} น.`}
                        />
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-stone-600 md:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3">
                          <Mail size={16} className="text-amber-800" />
                          {booking.customerEmail}
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3">
                          <Phone size={16} className="text-amber-800" />
                          {booking.customerPhone}
                        </div>
                      </div>

                      {booking.note && (
                        <div className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">
                          <span className="font-semibold text-stone-900">
                            หมายเหตุ:
                          </span>{" "}
                          {booking.note}
                        </div>
                      )}

                      <p className="mt-4 text-xs text-stone-400">
                        จองเมื่อ{" "}
                        {new Date(booking.createdAt).toLocaleString("th-TH")}
                      </p>
                    </div>

                    <div className="w-full rounded-3xl bg-stone-50 p-4 xl:w-64">
                      <p className="text-sm font-semibold text-stone-700">
                        จัดการสถานะ
                      </p>

                      <div className="mt-3 grid gap-2">
                        <button
                          onClick={() =>
                            updateStatus(booking._id, "confirmed")
                          }
                          disabled={booking.status === "confirmed"}
                          className="rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ยืนยันการจอง
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(booking._id, "completed")
                          }
                          disabled={booking.status === "completed"}
                          className="rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          เสร็จสิ้น
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(booking._id, "cancelled")
                          }
                          disabled={booking.status === "cancelled"}
                          className="rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ยกเลิก
                        </button>
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

function SummaryCard({
  title,
  value,
  color = "text-stone-950",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-stone-500">{title}</p>
      <h2 className={`mt-3 text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-stone-50 px-4 py-3">
      <p className="mb-2 text-xs text-stone-400">{label}</p>
      <p className="flex items-center gap-2 font-semibold text-stone-800">
        <span className="text-amber-800">{icon}</span>
        {value}
      </p>
    </div>
  );
}