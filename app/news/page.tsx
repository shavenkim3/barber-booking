import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Gift,
  Megaphone,
  Newspaper,
  Scissors,
  Sparkles,
  Tag,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const featuredNews = {
  title: "โปรโมชันเปิดเดือนใหม่ ลด 15% สำหรับลูกค้าที่จองคิวออนไลน์",
  category: "Promotion",
  date: "12 พฤษภาคม 2026",
  readTime: "อ่าน 3 นาที",
  description:
    "รับส่วนลดพิเศษสำหรับบริการตัดผมชาย Fade Cut และสระผม + เซ็ตทรง เมื่อจองผ่านระบบออนไลน์ภายในเดือนนี้",
};

const newsList = [
  {
    icon: Gift,
    title: "สะสมแต้มทุกครั้งที่จองคิว",
    category: "สิทธิพิเศษ",
    date: "10 พฤษภาคม 2026",
    description:
      "ลูกค้าสมาชิกสามารถสะสมแต้มจากการจองคิว และนำแต้มไปแลกรับส่วนลดในครั้งถัดไปได้",
  },
  {
    icon: Scissors,
    title: "แนะนำทรงผมยอดนิยมประจำเดือน",
    category: "Hair Style",
    date: "8 พฤษภาคม 2026",
    description:
      "รวมทรงผมชายยอดนิยม เช่น Fade Cut, Classic Cut และ Two Block ที่เหมาะกับลุคทำงานและลุคสบาย ๆ",
  },
  {
    icon: Sparkles,
    title: "เพิ่มบริการสระผมและเซ็ตทรง",
    category: "บริการใหม่",
    date: "5 พฤษภาคม 2026",
    description:
      "เพิ่มบริการสระผมพร้อมเซ็ตทรงสำหรับลูกค้าที่ต้องการความเรียบร้อยก่อนออกงานหรือไปทำงาน",
  },
  {
    icon: Megaphone,
    title: "แจ้งเวลาทำการช่วงวันหยุด",
    category: "ประกาศ",
    date: "1 พฤษภาคม 2026",
    description:
      "ร้านเปิดให้บริการตามปกติในช่วงวันหยุด แต่แนะนำให้จองคิวล่วงหน้าเพื่อหลีกเลี่ยงคิวเต็ม",
  },
];

const tips = [
  "ควรจองคิวล่วงหน้าอย่างน้อย 1 วัน",
  "มาก่อนเวลานัดประมาณ 5-10 นาที",
  "หากต้องการเปลี่ยนทรง สามารถแจ้งช่างก่อนเริ่มบริการ",
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-amber-50/50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-10 right-[-120px] h-72 w-72 rounded-full bg-stone-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              <Newspaper size={16} />
              ข่าวสารร้านตัดผม
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              อัปเดตข่าวสารและโปรโมชัน
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              ติดตามโปรโมชัน บริการใหม่ เทรนด์ทรงผม และประกาศสำคัญจาก BarberQ
              เพื่อไม่พลาดสิทธิพิเศษก่อนใคร
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="group overflow-hidden rounded-[36px] border border-stone-200 bg-white shadow-xl shadow-stone-200/60">
              <div className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-amber-100 via-stone-200 to-amber-800 p-8">
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm">
                  ข่าวเด่น
                </div>

                <div className="rounded-[32px] bg-white/20 p-8 backdrop-blur">
                  <Scissors size={88} className="text-white drop-shadow-md" />
                </div>

                <div className="absolute bottom-6 right-6 rounded-3xl bg-white/95 px-5 py-4 shadow-lg">
                  <p className="text-sm text-stone-500">Online Booking</p>
                  <p className="mt-1 text-2xl font-bold text-amber-800">
                    -15%
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    <Tag size={14} />
                    {featuredNews.category}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                    <CalendarDays size={14} />
                    {featuredNews.date}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                    <Clock3 size={14} />
                    {featuredNews.readTime}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold leading-tight text-stone-950 sm:text-3xl">
                  {featuredNews.title}
                </h2>

                <p className="mt-4 leading-8 text-stone-600">
                  {featuredNews.description}
                </p>

                <Link
                  href="/booking"
                  className="mt-7 inline-flex rounded-full bg-amber-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-900"
                >
                  จองคิวรับโปรโมชัน
                </Link>
              </div>
            </div>

            <aside className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                  <Sparkles size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-stone-950">
                    เคล็ดลับก่อนเข้าร้าน
                  </h2>
                  <p className="text-sm text-stone-500">
                    เพื่อให้บริการรวดเร็วและตรงใจ
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {tips.map((tip, index) => (
                  <div
                    key={tip}
                    className="flex gap-4 rounded-2xl bg-stone-50 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-800 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-stone-600">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-gradient-to-br from-stone-950 to-amber-900 p-6 text-white">
                <p className="text-sm text-white/70">เวลาทำการ</p>
                <h3 className="mt-2 text-2xl font-bold">10:00 - 18:00 น.</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  แนะนำให้จองคิวล่วงหน้าเพื่อเลือกช่างและเวลาที่ต้องการได้ง่ายขึ้น
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-14">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-sm font-semibold text-amber-800">
                  Latest Updates
                </span>

                <h2 className="mt-2 text-3xl font-bold text-stone-950">
                  ข่าวสารล่าสุด
                </h2>
              </div>

              <p className="text-sm text-stone-500">
                อัปเดตข่าวสาร โปรโมชัน และบริการใหม่ของร้าน
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {newsList.map((news) => {
                const Icon = news.icon;

                return (
                  <article
                    key={news.title}
                    className="group rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 transition group-hover:bg-amber-800 group-hover:text-white">
                      <Icon size={26} />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                        {news.category}
                      </span>

                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                        {news.date}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug text-stone-950">
                      {news.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {news.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}