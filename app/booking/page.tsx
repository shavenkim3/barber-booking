"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
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

type Service = {
  name: string;
  price: string;
  duration: string;
};

const services: Service[] = [
  { name: "ตัดผมชาย", price: "฿250", duration: "30 นาที" },
  { name: "Fade Cut", price: "฿350", duration: "45 นาที" },
  { name: "สระผม + เซ็ตทรง", price: "฿180", duration: "25 นาที" },
];

const barbers = ["พี่เจมส์", "พี่ไมค์", "พี่เดวิด"];

const times = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [selectedBarber, setSelectedBarber] = useState(barbers[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const params = new URLSearchParams(window.location.search);
    const barberFromUrl = params.get("barber");

    if (barberFromUrl && barbers.includes(barberFromUrl)) {
      setSelectedBarber(barberFromUrl);
    }
  }, []);

  useEffect(() => {
    async function fetchBookedTimes() {
      if (!selectedDate || !selectedBarber) {
        setBookedTimes([]);
        return;
      }

      setLoadingTimes(true);

      try {
        const res = await fetch(
          `/api/bookings?date=${encodeURIComponent(
            selectedDate
          )}&barberName=${encodeURIComponent(selectedBarber)}`
        );

        const data = await res.json();

        if (res.ok) {
          const timesFromDB = data.bookedTimes || [];
          setBookedTimes(timesFromDB);

          if (timesFromDB.includes(selectedTime)) {
            setSelectedTime("");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTimes(false);
      }
    }

    fetchBookedTimes();
  }, [selectedDate, selectedBarber, selectedTime]);

  async function handleBooking() {
    setMessage("");

    if (!user) {
      setMessage("กรุณาเข้าสู่ระบบก่อนจองคิว");
      return;
    }

    if (!selectedBarber) {
      setMessage("กรุณาเลือกช่างตัดผม");
      return;
    }

    if (!selectedDate) {
      setMessage("กรุณาเลือกวันที่");
      return;
    }

    if (!selectedTime) {
      setMessage("กรุณาเลือกเวลา");
      return;
    }

    if (bookedTimes.includes(selectedTime)) {
      setMessage("เวลานี้ถูกจองไปแล้ว กรุณาเลือกเวลาอื่น");
      return;
    }

    if (!user.phone) {
      setMessage("บัญชีนี้ยังไม่มีเบอร์โทร กรุณาแก้ไขข้อมูลโปรไฟล์ก่อนจองคิว");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          customerName: user.name,
          customerEmail: user.email,
          customerPhone: user.phone,
          serviceName: selectedService.name,
          servicePrice: selectedService.price,
          serviceDuration: selectedService.duration,
          barberName: selectedBarber,
          date: selectedDate,
          time: selectedTime,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "จองคิวไม่สำเร็จ");
        return;
      }

      setMessage("จองคิวสำเร็จ ระบบบันทึกข้อมูลเรียบร้อยแล้ว");
      setBookedTimes((prev) => [...prev, selectedTime]);
      setSelectedTime("");
      setNote("");
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาดในการจองคิว");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              Booking Appointment
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              จองคิวร้านตัดผม
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
              เลือกบริการ ช่างตัดผม และเวลาที่สะดวก
              ระบบจะตรวจสอบเวลาที่ถูกจองจากฐานข้อมูลให้อัตโนมัติ
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[36px] border border-stone-200 bg-white p-5 shadow-xl shadow-stone-200/60 sm:p-8">
              <div>
                <div className="flex items-center gap-2">
                  <Scissors size={18} className="text-amber-800" />
                  <label className="text-sm font-semibold text-stone-700">
                    เลือกบริการ
                  </label>
                </div>

                <div className="mt-3 grid gap-4 sm:grid-cols-3">
                  {services.map((service) => {
                    const active = selectedService.name === service.name;

                    return (
                      <button
                        type="button"
                        key={service.name}
                        onClick={() => setSelectedService(service)}
                        className={`rounded-3xl border p-5 text-left transition ${
                          active
                            ? "border-amber-800 bg-amber-50 shadow-md"
                            : "border-stone-200 bg-stone-50 hover:border-amber-700 hover:bg-amber-50"
                        }`}
                      >
                        <h3 className="font-bold text-stone-950">
                          {service.name}
                        </h3>

                        <p className="mt-2 text-sm text-stone-500">
                          {service.duration}
                        </p>

                        <p className="mt-4 text-xl font-bold text-amber-800">
                          {service.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <UserRound size={18} className="text-amber-800" />
                    <label className="text-sm font-semibold text-stone-700">
                      เลือกช่างตัดผม
                    </label>
                  </div>

                  <select
                    value={selectedBarber}
                    onChange={(e) => {
                      setSelectedBarber(e.target.value);
                      setSelectedTime("");
                      setMessage("");
                    }}
                    className="mt-3 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-700 outline-none focus:border-amber-800"
                  >
                    {barbers.map((barber) => (
                      <option key={barber} value={barber}>
                        {barber}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-amber-800" />
                    <label className="text-sm font-semibold text-stone-700">
                      เลือกวันที่
                    </label>
                  </div>

                  <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime("");
                      setMessage("");
                    }}
                    className="mt-3 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-700 outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-amber-800" />
                  <label className="text-sm font-semibold text-stone-700">
                    เลือกเวลา
                  </label>
                </div>

                {loadingTimes && (
                  <p className="mt-3 text-sm text-stone-500">
                    กำลังตรวจสอบเวลาที่ถูกจอง...
                  </p>
                )}

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {times.map((time) => {
                    const active = selectedTime === time;
                    const isBooked = bookedTimes.includes(time);

                    return (
                      <button
                        type="button"
                        key={time}
                        disabled={!selectedDate || isBooked}
                        onClick={() => {
                          setSelectedTime(time);
                          setMessage("");
                        }}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          isBooked
                            ? "cursor-not-allowed border-stone-200 bg-stone-200 text-stone-400 line-through"
                            : active
                            ? "border-amber-800 bg-amber-800 text-white"
                            : "border-stone-300 bg-white text-stone-700 hover:border-amber-800 hover:bg-amber-50"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        {time} น.
                        {isBooked && (
                          <span className="ml-1 text-xs">(จองแล้ว)</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {!selectedDate && (
                  <p className="mt-3 text-sm text-stone-500">
                    กรุณาเลือกวันที่ก่อน ระบบจะแสดงเวลาที่ว่างให้เลือก
                  </p>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-amber-800" />
                  <label className="text-sm font-semibold text-stone-700">
                    หมายเหตุเพิ่มเติม
                  </label>
                </div>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="เช่น อยากได้ทรงประมาณไหน หรือรายละเอียดเพิ่มเติม"
                  rows={4}
                  className="mt-3 w-full resize-none rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-700 outline-none focus:border-amber-800"
                />
              </div>

              {message && (
                <div className="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                  {message}
                </div>
              )}

              <button
                type="button"
                onClick={handleBooking}
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-amber-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "กำลังบันทึกการจอง..." : "ยืนยันการจองคิว"}
              </button>
            </div>

            <aside className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-amber-800" />
                <h2 className="text-xl font-bold text-stone-950">
                  สรุปการจอง
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">บริการ</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedService.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">ราคา</p>
                  <p className="mt-1 font-semibold text-amber-800">
                    {selectedService.price}
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">ระยะเวลา</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedService.duration}
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">ช่างตัดผม</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedBarber || "-"}
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">วันที่และเวลา</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedDate || "-"}{" "}
                    {selectedTime ? `• ${selectedTime} น.` : ""}
                  </p>
                </div>

                {user && (
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="font-semibold text-stone-950">{user.name}</p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-stone-600">
                      <Mail size={15} />
                      {user.email}
                    </p>

                    {user.phone && (
                      <p className="mt-2 flex items-center gap-2 text-sm text-stone-600">
                        <Phone size={15} />
                        {user.phone}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}