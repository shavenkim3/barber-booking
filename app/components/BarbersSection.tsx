export default function BarbersSection() {
  const barbers = [
    {
      name: "พี่เจมส์",
      role: "ผู้เชี่ยวชาญ Fade Cut",
      experience: "ประสบการณ์ 6 ปี",
    },
    {
      name: "พี่ไมค์",
      role: "ผู้เชี่ยวชาญ Classic Cut",
      experience: "ประสบการณ์ 5 ปี",
    },
    {
      name: "พี่เดวิด",
      role: "ผู้เชี่ยวชาญ Styling",
      experience: "ประสบการณ์ 4 ปี",
    },
  ];

  return (
    <section className="bg-stone-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-amber-800">ทีมช่างของเรา</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
              เลือกช่างตัดผมที่คุณชอบ
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              ลูกค้าสามารถเลือกช่างที่ถนัดสไตล์ต่าง ๆ ได้ตามต้องการ
              เพื่อให้ได้ทรงผมที่เหมาะกับตัวเองมากที่สุด
            </p>
          </div>

          <button className="w-full rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-100 sm:w-fit">
            ดูช่างทั้งหมด
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber, index) => (
            <div
              key={barber.name}
              className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-72 items-center justify-center bg-gradient-to-br from-amber-100 via-stone-200 to-amber-800">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 text-3xl font-bold text-amber-800 shadow-md">
                  {index + 1}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-stone-950">{barber.name}</h3>
                <p className="mt-2 font-medium text-amber-800">{barber.role}</p>
                <p className="mt-2 text-sm text-stone-500">{barber.experience}</p>

                <button className="mt-6 w-full rounded-full bg-amber-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-900">
                  จองกับช่างคนนี้
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}