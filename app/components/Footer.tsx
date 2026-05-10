export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-stone-950">
            Barber<span className="text-amber-700">Q</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-600">
            ระบบจองคิวร้านตัดผมออนไลน์ ช่วยให้ลูกค้าจองเวลาได้ง่าย
            และช่วยให้ร้านจัดการคิวได้เป็นระบบมากขึ้น
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-950">เมนู</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-stone-600">
            <a href="#" className="hover:text-amber-800">หน้าแรก</a>
            <a href="#" className="hover:text-amber-800">บริการ</a>
            <a href="#" className="hover:text-amber-800">ช่างตัดผม</a>
            <a href="#" className="hover:text-amber-800">จองคิว</a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-stone-950">ติดต่อร้าน</h3>
          <div className="mt-4 space-y-3 text-sm text-stone-600">
            <p>โทร: 080-000-0000</p>
            <p>อีเมล: contact@barberq.com</p>
            <p>เวลาเปิด: 10:00 - 20:00 น.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-stone-200 pt-6 text-center text-sm text-stone-500">
        © 2026 BarberQ. All rights reserved.
      </div>
    </footer>
  );
}