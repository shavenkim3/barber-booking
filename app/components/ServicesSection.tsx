export default function ServicesSection() {
  const services = [
    {
      name: "ตัดผมชาย",
      price: "฿250",
      duration: "30 นาที",
      description: "บริการตัดผมทรงสุภาพ ทรงแฟชั่น และทรงที่เหมาะกับรูปหน้า",
    },
    {
      name: "Fade Cut",
      price: "฿350",
      duration: "45 นาที",
      description: "ตัดเฟดเนียนละเอียด เหมาะสำหรับลุคทันสมัยและดูสะอาด",
    },
    {
      name: "สระผม + เซ็ตทรง",
      price: "฿180",
      duration: "25 นาที",
      description: "สระผมพร้อมเซ็ตทรงให้พร้อมออกไปทำงานหรือออกงาน",
    },
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-amber-800">บริการของเรา</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
            เลือกบริการที่เหมาะกับคุณ
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            บริการตัดผมและดูแลทรงผมสำหรับผู้ชาย ออกแบบให้จองง่าย
            ราคาและระยะเวลาชัดเจน
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-stone-950">{service.name}</h3>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                  {service.duration}
                </span>
              </div>

              <p className="mt-4 leading-7 text-stone-600">{service.description}</p>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-2xl font-bold text-amber-800">{service.price}</p>
                <button className="rounded-full bg-stone-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-amber-900">
                  เลือกบริการ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}