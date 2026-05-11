"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const bookingLink = user ? "/booking" : "/login";

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    setOpenMenu(false);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-stone-900 sm:text-2xl">
          Barber<span className="text-amber-700">Q</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="text-sm font-medium text-stone-600 hover:text-amber-800">
            หน้าแรก
          </Link>

          <Link href="/#services" className="text-sm font-medium text-stone-600 hover:text-amber-800">
            บริการ
          </Link>

          <Link href="/#barbers" className="text-sm font-medium text-stone-600 hover:text-amber-800">
            ช่างตัดผม
          </Link>

          <Link href={bookingLink} className="text-sm font-medium text-stone-600 hover:text-amber-800">
            จองคิว
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2 shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-800 text-sm font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {user.name}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">{user.email}</p>

                  {user.phone && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-amber-800">
                      <Phone size={12} />
                      {user.phone}
                    </p>
                  )}
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-amber-800">
                เข้าสู่ระบบ
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-amber-800 px-5 py-2 text-sm font-medium text-white hover:bg-amber-900"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-800 lg:hidden"
        >
          {openMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {openMenu && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 shadow-sm lg:hidden">
          {user && (
            <Link
              href="/profile"
              onClick={() => setOpenMenu(false)}
              className="mb-4 block rounded-3xl border border-stone-200 bg-stone-50 p-4"
            >
              <p className="font-semibold text-stone-900">{user.name}</p>
              <p className="mt-1 text-sm text-stone-500">{user.email}</p>
            </Link>
          )}

          <nav className="flex flex-col gap-2">
            <Link onClick={() => setOpenMenu(false)} href="/" className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50">
              หน้าแรก
            </Link>

            <Link onClick={() => setOpenMenu(false)} href="/#services" className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50">
              บริการ
            </Link>

            <Link onClick={() => setOpenMenu(false)} href="/#barbers" className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50">
              ช่างตัดผม
            </Link>

            <Link onClick={() => setOpenMenu(false)} href={bookingLink} className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50">
              จองคิว
            </Link>
          </nav>

          <div className="mt-4 border-t border-stone-200 pt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-700"
              >
                ออกจากระบบ
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  onClick={() => setOpenMenu(false)}
                  href="/login"
                  className="rounded-2xl border border-stone-300 px-4 py-3 text-center text-sm font-semibold text-stone-700"
                >
                  เข้าสู่ระบบ
                </Link>

                <Link
                  onClick={() => setOpenMenu(false)}
                  href="/register"
                  className="rounded-2xl bg-amber-800 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}