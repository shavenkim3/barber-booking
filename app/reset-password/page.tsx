"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Eye, EyeOff, KeyRound, Lock, Scissors } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email || !otp || !newPassword) {
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      setLoading(false);
      return;
    }

    if (otp.length !== 6) {
      setMessage("กรุณากรอก OTP ให้ครบ 6 หลัก");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "เปลี่ยนรหัสผ่านไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setMessage("เปลี่ยนรหัสผ่านสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาด");
      setLoading(false);
    }
  }

  function handleOtpChange(e: React.ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setOtp(onlyNumbers.slice(0, 6));
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
              ตั้งรหัสผ่านใหม่
            </h1>

            <p className="mt-2 text-sm leading-6 text-stone-600">
              กรอก OTP ที่ได้รับทางอีเมล และตั้งรหัสผ่านใหม่ของคุณ
            </p>

            <p className="mt-3 rounded-2xl bg-stone-50 px-4 py-2 text-xs text-stone-500">
              {email || "ไม่พบอีเมล กรุณาขอ OTP ใหม่อีกครั้ง"}
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-stone-700">
                  รหัส OTP
                </label>

                <span className="text-xs text-stone-400">
                  {otp.length}/6 หลัก
                </span>
              </div>

              <input
                type="text"
                inputMode="numeric"
                placeholder="กรอก OTP 6 หลัก"
                value={otp}
                onChange={handleOtpChange}
                className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-center text-lg font-bold tracking-[0.4em] outline-none transition focus:border-amber-800"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700">
                รหัสผ่านใหม่
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-300 bg-white px-4 py-3 focus-within:border-amber-800">
                <Lock size={18} className="text-stone-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-400 transition hover:text-stone-700"
                  aria-label="แสดงหรือซ่อนรหัสผ่าน"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
              {loading ? "กำลังเปลี่ยนรหัสผ่าน..." : "ยืนยันเปลี่ยนรหัสผ่าน"}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-6 flex items-center justify-center text-sm font-semibold text-stone-600 transition hover:text-amber-800"
          >
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-stone-50">
          <p className="text-sm text-stone-500">กำลังโหลด...</p>
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}