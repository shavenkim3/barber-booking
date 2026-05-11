"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Save, ShieldCheck, UserRound } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyBookingsSection from "../components/MyBookingsSection";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    setUser(parsedUser);
    setName(parsedUser.name || "");
    setPhone(parsedUser.phone || "");
  }, []);

  async function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) return;

    setLoading(true);
    setMessage("");

    if (!name || !phone) {
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      setLoading(false);
      return;
    }

    if (phone.length !== 10) {
      setMessage("เบอร์โทรต้องมี 10 หลัก");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "อัปเดตข้อมูลไม่สำเร็จ");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setMessage("อัปเดตข้อมูลสำเร็จ");
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาด");
    }

    setLoading(false);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setPhone(onlyNumbers.slice(0, 10));
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              My Profile
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              โปรไฟล์ของฉัน
            </h1>

            <p className="mt-4 text-stone-600">
              จัดการข้อมูลส่วนตัวและดูรายละเอียดการจองของคุณในหน้าเดียว
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
            <div className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60 sm:p-8">
              {user && (
                <div className="mb-8 flex flex-col items-center border-b border-stone-200 pb-8 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-800 text-3xl font-bold text-white shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-stone-950">
                    {user.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600">
                      <Mail size={16} />
                      {user.email}
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                      <ShieldCheck size={16} />
                      {user.role === "admin" ? "Administrator" : "User"}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    ชื่อผู้ใช้งาน
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                    <UserRound size={18} className="text-stone-400" />

                    <input
                      type="text"
                      placeholder="ชื่อของคุณ"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    เบอร์โทรศัพท์
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                    <Phone size={18} className="text-stone-400" />

                    <input
                      type="tel"
                      placeholder="0812345678"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>

                  <p className="mt-2 text-xs text-stone-400">
                    กรุณากรอกเบอร์โทร 10 หลัก
                  </p>
                </div>

                {message && (
                  <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-800 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={18} />
                  {loading ? "กำลังบันทึกข้อมูล..." : "บันทึกข้อมูล"}
                </button>
              </form>
            </div>

            <div>
              <MyBookingsSection />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}