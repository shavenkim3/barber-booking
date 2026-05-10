"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Scissors,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("เข้าสู่ระบบสำเร็จ กำลังไปหน้าแรก...");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาด");
    }

    setLoading(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 px-4 py-10">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-stone-300/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left Content */}
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
            เข้าสู่ระบบ
            <br />
            เพื่อจองคิวตัดผม
            <br />
            ได้สะดวกกว่าเดิม
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            เลือกบริการ เลือกช่าง และจัดการประวัติการจองของคุณได้ง่ายในระบบเดียว
          </p>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <ShieldCheck className="text-amber-800" size={26} />

              <h3 className="mt-4 font-bold text-stone-950">
                ปลอดภัย
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                รหัสผ่านถูกเข้ารหัสก่อนบันทึกลงฐานข้อมูล
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <Scissors className="text-amber-800" size={26} />

              <h3 className="mt-4 font-bold text-stone-950">
                จองง่าย
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                เลือกวัน เวลา บริการ และช่างตัดผมได้ทันที
              </p>
            </div>
          </div>
        </section>

        {/* Login Form */}
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
                <Lock size={26} />
              </div>

              <h2 className="mt-5 text-3xl font-bold text-stone-950">
                เข้าสู่ระบบ
              </h2>

              <p className="mt-2 text-sm text-stone-600">
                เข้าสู่ระบบเพื่อจองคิวและดูข้อมูลการจองของคุณ
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {/* Email */}
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

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-stone-700">
                    รหัสผ่าน
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-amber-800 hover:text-amber-900"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                  <Lock size={18} className="text-stone-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-stone-400 transition hover:text-stone-700"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Message */}
              {message && (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {message}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-amber-800 py-3.5 font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-600">
              ยังไม่มีบัญชี?{" "}
              <Link
                href="/register"
                className="font-semibold text-amber-800"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}