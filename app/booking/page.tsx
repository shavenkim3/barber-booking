"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, Clock, Scissors, UserRound } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function BookingPage() {
  const services = [
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

  const [user, setUser] = useState<User | null>(null);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedBarber, setSelectedBarber] = useState(barbers[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function handleBooking() {
    setMessage("");

    if (!user) {
      setMessage("กรุณาเข้าสู่ระบบก่อนจองคิว");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setMessage("กรุณาเลือกวันที่และเวลา");
      return;
    }

    if (!user.phone) {
      setMessage("บัญชีนี้ยังไม่มีเบอร์โทร กรุณาสมัครหรือเข้าสู่ระบบด้วยบัญชีที่มีเบอร์โทร");
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
        setLoading(false);
        return;
      }

      setMessage("จองคิวสำเร็จ ระบบบันทึกข้อมูลเรียบร้อยแล้ว");
      setSelectedDate("");
      setSelectedTime("");
      setNote("");
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาดในการจองคิว");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-stone-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              Booking Appointment
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              จองคิวร้านตัดผม
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
              เลือกบริการ ช่างตัดผม และเวลาที่สะดวก ระบบจะบันทึกการจองลงฐานข้อมูลจริง
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[36px] border border-stone-200 bg-white/90 p-5 shadow-xl shadow-stone-200/60 backdrop-blur sm:p-8">
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
                    onChange={(e) => setSelectedBarber(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-700 outline-none focus:border-amber-800"
                  >
                    {barbers.map((barber) => (
                      <option key={barber}>{barber}</option>
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
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
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

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {times.map((time) => {
                    const active = selectedTime === time;

                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          active
                            ? "border-amber-800 bg-amber-800 text-white"
                            : "border-stone-300 bg-white text-stone-700 hover:border-amber-800 hover:bg-amber-50"
                        }`}
                      >
                        {time} น.
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-semibold text-stone-700">
                  หมายเหตุเพิ่มเติม
                </label>

                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="เช่น ต้องการตัดสั้นด้านข้าง หรือมีทรงตัวอย่าง..."
                  className="mt-3 w-full resize-none rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-700 outline-none focus:border-amber-800"
                />
              </div>

              {message && (
                <p className="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {message}
                </p>
              )}

              <button
                type="button"
                onClick={handleBooking}
                disabled={loading}
                className="mt-8 w-full rounded-2xl bg-amber-800 py-4 text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "กำลังบันทึกการจอง..." : "ยืนยันการจองคิว"}
              </button>
            </div>

            <aside className="h-fit rounded-[36px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60 lg:sticky lg:top-28">
              <h2 className="text-2xl font-bold text-stone-950">
                สรุปการจอง
              </h2>

              {user ? (
                <div className="mt-5 rounded-3xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">ผู้จอง</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {user.name}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">{user.email}</p>
                  {user.phone && (
                    <p className="mt-1 text-sm text-amber-800">
                      โทร: {user.phone}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-5 rounded-3xl bg-red-50 p-4 text-sm text-red-700">
                  กรุณาเข้าสู่ระบบก่อนจองคิว
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">บริการ</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedService.name} • {selectedService.price}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    ระยะเวลา {selectedService.duration}
                  </p>
                </div>

                <div className="rounded-3xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">ช่างตัดผม</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedBarber}
                  </p>
                </div>

                <div className="rounded-3xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">วันและเวลา</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {selectedDate || "ยังไม่ได้เลือกวันที่"}{" "}
                    {selectedTime ? `• ${selectedTime} น.` : ""}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-amber-50 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
                  <CheckCircle size={16} />
                  หมายเหตุ
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-900/80">
                  กรุณามาก่อนเวลานัดประมาณ 5-10 นาที เพื่อให้ร้านจัดคิวได้สะดวก
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}