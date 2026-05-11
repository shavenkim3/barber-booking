import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-stone-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
            ระบบจองคิวร้านตัดผมออนไลน์
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
            จองคิวตัดผม
            <br className="hidden sm:block" />
            ได้ง่ายในไม่กี่คลิก
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg lg:mx-0">
            เลือกบริการ เลือกช่างตัดผม และเลือกเวลาที่สะดวกได้ด้วยตัวเอง
            ช่วยให้ร้านจัดการคิวได้ง่ายขึ้น และลูกค้าไม่ต้องรอนาน
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/booking"
              className="rounded-full bg-amber-800 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-amber-900"
            >
              เริ่มจองคิว
            </Link>

            <Link
              href="/#services"
              className="rounded-full border border-stone-300 bg-white px-7 py-3 text-center text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              ดูบริการทั้งหมด
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:max-w-lg lg:max-w-xl">
            <div>
              <h3 className="text-2xl font-bold text-stone-950">500+</h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                ลูกค้า
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-950">15+</h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                ช่างมืออาชีพ
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-950">4.9</h3>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                คะแนนรีวิว
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="h-[360px] rounded-[32px] bg-gradient-to-br from-amber-100 via-stone-200 to-amber-800 shadow-xl sm:h-[460px] lg:h-[540px]" />

          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-stone-200 bg-white/95 p-5 shadow-xl backdrop-blur sm:left-6 sm:right-auto sm:w-72">
            <p className="text-sm text-stone-500">คิวถัดไป</p>

            <h3 className="mt-2 text-lg font-semibold text-stone-950">
              ตัดผมทรง Fade
            </h3>

            <p className="mt-1 text-sm text-stone-600">
              วันนี้ • 15:30 น.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}