"use client";

import { useEffect, useState } from "react";
import {
  Edit,
  ImageIcon,
  Newspaper,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type News = {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  isFeatured: boolean;
  createdAt: string;
};

const emptyForm = {
  title: "",
  category: "",
  description: "",
  imageUrl: "",
  isFeatured: false,
};

export default function AdminNewsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.role !== "admin") {
      window.location.href = "/";
      return;
    }

    setUser(parsedUser);
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEdit(news: News) {
    setEditingId(news._id);
    setFormData({
      title: news.title,
      category: news.category,
      description: news.description,
      imageUrl: news.imageUrl || "",
      isFeatured: news.isFeatured,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId("");
    setFormData(emptyForm);
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const url = editingId ? `/api/news/${editingId}` : "/api/news";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "บันทึกข่าวสารไม่สำเร็จ");
        return;
      }

      setMessage(editingId ? "แก้ไขข่าวสารสำเร็จ" : "เพิ่มข่าวสารสำเร็จ");
      setFormData(emptyForm);
      setEditingId("");
      fetchNews();
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("ต้องการลบข่าวสารนี้ใช่ไหม?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "ลบข่าวสารไม่สำเร็จ");
        return;
      }

      setNewsList((prev) => prev.filter((news) => news._id !== id));
      setMessage("ลบข่าวสารสำเร็จ");
    } catch (error) {
      console.log(error);
      setMessage("เกิดข้อผิดพลาดในการลบข่าวสาร");
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="bg-gradient-to-b from-white via-stone-50 to-amber-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              <Newspaper size={16} />
              News Management
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              จัดการข่าวสาร
            </h1>

            <p className="mt-4 max-w-2xl text-stone-600">
              เพิ่ม แก้ไข ลบข่าวสาร โปรโมชัน และประกาศของร้านตัดผม
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-stone-950">
                    {editingId ? "แก้ไขข่าวสาร" : "เพิ่มข่าวสารใหม่"}
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    รูปภาพใช้เป็น URL รูป เช่น รูปจาก Cloudinary หรือ Unsplash
                  </p>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    หัวข้อข่าวสาร
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="เช่น โปรโมชันลด 15%"
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    หมวดหมู่
                  </label>

                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="เช่น Promotion, ประกาศ, บริการใหม่"
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    รายละเอียด
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="รายละเอียดข่าวสาร..."
                    className="w-full resize-none rounded-2xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    URL รูปภาพ
                  </label>

                  <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-800"
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isFeatured: e.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />
                  ตั้งเป็นข่าวเด่น
                </label>

                {formData.imageUrl && (
                  <div className="overflow-hidden rounded-3xl border border-stone-200">
                    <img
                      src={formData.imageUrl}
                      alt="preview"
                      className="h-56 w-full object-cover"
                    />
                  </div>
                )}

                {message && (
                  <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-60"
                >
                  {editingId ? <Save size={18} /> : <Plus size={18} />}
                  {saving
                    ? "กำลังบันทึก..."
                    : editingId
                    ? "บันทึกการแก้ไข"
                    : "เพิ่มข่าวสาร"}
                </button>
              </div>
            </form>

            <div className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60">
              <h2 className="text-2xl font-bold text-stone-950">
                รายการข่าวสารทั้งหมด
              </h2>

              {loading && (
                <p className="mt-5 text-sm text-stone-500">
                  กำลังโหลดข่าวสาร...
                </p>
              )}

              {!loading && newsList.length === 0 && (
                <p className="mt-5 rounded-2xl bg-stone-50 p-5 text-sm text-stone-500">
                  ยังไม่มีข่าวสาร
                </p>
              )}

              <div className="mt-6 grid gap-5">
                {newsList.map((news) => (
                  <div
                    key={news._id}
                    className="overflow-hidden rounded-[28px] border border-stone-200 bg-stone-50"
                  >
                    {news.imageUrl ? (
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="h-52 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-52 items-center justify-center bg-gradient-to-br from-amber-100 to-stone-200 text-amber-800">
                        <ImageIcon size={48} />
                      </div>
                    )}

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                          {news.category}
                        </span>

                        {news.isFeatured && (
                          <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white">
                            ข่าวเด่น
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-stone-950">
                        {news.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">
                        {news.description}
                      </p>

                      <p className="mt-3 text-xs text-stone-400">
                        {new Date(news.createdAt).toLocaleString("th-TH")}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleEdit(news)}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white hover:bg-stone-800"
                        >
                          <Edit size={16} />
                          แก้ไข
                        </button>

                        <button
                          onClick={() => handleDelete(news._id)}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}