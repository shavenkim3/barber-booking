"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Scissors,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setPhone(onlyNumbers.slice(0, 10));
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!name || !email || !phone || !password) {
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      setLoading(false);
      return;
    }

    if (phone.length !== 10) {
      setMessage("กรุณากรอกเบอร์โทรให้ครบ 10 หลัก");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "สมัครสมาชิกไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setMessage("สมัครสมาชิกสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาด");
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 px-4 py-10">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-stone-300/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <section className="hidden lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-3xl font-bold text-stone-950"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-800 text-white">
              <Scissors size={24} />
            </span>
            Barber<span className="text-amber-700">Q</span>
          </Link>

          <h1 className="mt-10 text-5xl font-bold leading-tight tracking-tight text-stone-950">
            สมัครสมาชิก
            <br />
            เพื่อเริ่มจองคิว
            <br />
            ร้านตัดผมออนไลน์
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            สร้างบัญชีของคุณเพื่อจองคิว เลือกช่างตัดผม และติดตามประวัติการจองได้สะดวกขึ้น
          </p>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <ShieldCheck className="text-amber-800" size={26} />
              <h3 className="mt-4 font-bold text-stone-950">ข้อมูลปลอดภัย</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                ระบบเข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูล
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <Phone className="text-amber-800" size={26} />
              <h3 className="mt-4 font-bold text-stone-950">ติดต่อได้ง่าย</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                เบอร์โทรช่วยให้ร้านติดต่อยืนยันคิวกับลูกค้าได้สะดวก
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-stone-950"
            >
              Barber<span className="text-amber-700">Q</span>
            </Link>
          </div>

          <div className="rounded-[36px] border border-stone-200 bg-white/90 p-6 shadow-2xl shadow-stone-200/70 backdrop-blur sm:p-8">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <UserRound size={26} />
              </div>

              <h2 className="mt-5 text-3xl font-bold text-stone-950">
                สมัครสมาชิก
              </h2>

              <p className="mt-2 text-sm text-stone-600">
                สร้างบัญชีเพื่อจองคิวร้านตัดผมออนไลน์
              </p>
            </div>

            <form onSubmit={handleRegister} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  ชื่อ
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                  <UserRound size={18} className="text-stone-400" />
                  <input
                    type="text"
                    placeholder="ชื่อของคุณ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700">
                  อีเมล
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                  <Mail size={18} className="text-stone-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-stone-700">
                    เบอร์โทร
                  </label>

                  <span
                    className={`text-xs ${
                      phone.length === 10 ? "text-amber-800" : "text-stone-400"
                    }`}
                  >
                    {phone.length}/10 หลัก
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                  <Phone size={18} className="text-stone-400" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="0812345678"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700">
                  รหัสผ่าน
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                  <Lock size={18} className="text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-stone-400 transition hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {message && (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-amber-800 py-3.5 font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-600">
              มีบัญชีอยู่แล้ว?{" "}
              <Link href="/login" className="font-semibold text-amber-800">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}