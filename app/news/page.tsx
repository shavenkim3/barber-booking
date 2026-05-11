"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Gift,
  ImageIcon,
  Megaphone,
  Newspaper,
  Scissors,
  Sparkles,
  Tag,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type News = {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  isFeatured: boolean;
  createdAt: string;
};

const tips = [
  "ควรจองคิวล่วงหน้าอย่างน้อย 1 วัน",
  "มาก่อนเวลานัดประมาณ 5-10 นาที",
  "หากต้องการเปลี่ยนทรง สามารถแจ้งช่างก่อนเริ่มบริการ",
];

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();

      if (res.ok) {
        setNewsList(data.news || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const featuredNews =
    newsList.find((news) => news.isFeatured) || newsList[0] || null;

  const normalNews = newsList.filter(
    (news) => news._id !== featuredNews?._id
  );

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
            </p>
          </div>

          {loading && (
            <div className="mt-12 rounded-[32px] bg-white p-8 text-center text-stone-500 shadow-sm">
              กำลังโหลดข่าวสาร...
            </div>
          )}

          {!loading && !featuredNews && (
            <div className="mt-12 rounded-[32px] bg-white p-8 text-center text-stone-500 shadow-sm">
              ยังไม่มีข่าวสารจากร้าน
            </div>
          )}

          {!loading && featuredNews && (
            <>
              <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="group overflow-hidden rounded-[36px] border border-stone-200 bg-white shadow-xl shadow-stone-200/60">
                  <div className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-amber-100 via-stone-200 to-amber-800">
                    <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm">
                      ข่าวเด่น
                    </div>

                    {featuredNews.imageUrl ? (
                      <img
                        src={featuredNews.imageUrl}
                        alt={featuredNews.title}
                        className="h-[320px] w-full object-cover"
                      />
                    ) : (
                      <div className="rounded-[32px] bg-white/20 p-8 backdrop-blur">
                        <Scissors
                          size={88}
                          className="text-white drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        <Tag size={14} />
                        {featuredNews.category}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                        <CalendarDays size={14} />
                        {new Date(featuredNews.createdAt).toLocaleDateString(
                          "th-TH"
                        )}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                        <Clock3 size={14} />
                        อ่าน 3 นาที
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
                      จองคิวเลย
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

                        <p className="text-sm leading-6 text-stone-600">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>

              <div className="mt-14">
                <h2 className="text-3xl font-bold text-stone-950">
                  ข่าวสารล่าสุด
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {normalNews.map((news) => (
                    <article
                      key={news._id}
                      className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                    >
                      {news.imageUrl ? (
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="h-56 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center bg-gradient-to-br from-amber-100 to-stone-200 text-amber-800">
                          <ImageIcon size={48} />
                        </div>
                      )}

                      <div className="p-6">
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                          {news.category}
                        </span>

                        <h3 className="mt-5 text-xl font-bold leading-snug text-stone-950">
                          {news.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-stone-600">
                          {news.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}