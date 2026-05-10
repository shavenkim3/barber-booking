"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, KeyRound, Mail, Scissors } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email) {
      setMessage("กรุณากรอกอีเมล");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "ส่ง OTP ไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setMessage("ส่ง OTP ไปยังอีเมลเรียบร้อยแล้ว กำลังไปหน้าตั้งรหัสผ่านใหม่...");

      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาดในการส่ง OTP");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 px-4 py-10">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-stone-300/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-stone-950"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-800 text-white">
              <Scissors size={20} />
            </span>
            Barber<span className="text-amber-700">Q</span>
          </Link>
        </div>

        <div className="rounded-[36px] border border-stone-200 bg-white/90 p-6 shadow-2xl shadow-stone-200/70 backdrop-blur sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <KeyRound size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-stone-950">
              ลืมรหัสผ่าน?
            </h1>

            <p className="mt-2 text-sm leading-6 text-stone-600">
              กรอกอีเมลที่ใช้สมัครสมาชิก ระบบจะส่งรหัส OTP สำหรับตั้งรหัสผ่านใหม่ให้คุณ
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-5">
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

            {message && (
              <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-amber-800 py-3.5 font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "กำลังส่ง OTP..." : "ส่งรหัส OTP"}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-amber-800"
          >
            <ArrowLeft size={16} />
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </main>
  );
}