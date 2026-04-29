import React from "react";
import { ArrowRight, CheckCircle2, Globe, LayoutDashboard, ShieldCheck, Smartphone, Zap, Search, ShoppingCart, BarChart3, Database } from "lucide-react";
import Link from "next/link";

export default function PresentationPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight text-primary">Flamboyan<span className="text-orange-500">OTA</span></div>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-primary transition">Back to App</Link>
        </div>
      </nav>

      {/* Slide 1: Hero / Title */}
      <section className="min-h-screen flex items-center justify-center pt-16 px-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-primary font-bold text-sm mb-6 animate-fade-in-up">
            <Zap size={16} className="fill-primary" /> Presentasi Produk 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            The Next Generation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Travel Super-App</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Platform Online Travel Agency (OTA) terlengkap, cepat, dan modern. Dirancang khusus untuk memberikan pengalaman pemesanan tiket dan manajemen travel kelas enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#features" className="px-8 py-4 bg-primary hover:bg-[#017bc7] text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
              Lihat Fitur Utama <ArrowRight size={20} />
            </a>
            <Link href="/" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-lg shadow-sm border border-slate-200 transition-all">
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Slide 2: Why Flamboyan? */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Mengapa Flamboyan?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Solusi all-in-one yang menggabungkan kemudahan pengguna (Frontend) dengan kekuatan kontrol penuh (Backend Admin).</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Multi-Produk Terintegrasi", desc: "Satu platform untuk Tiket Pesawat, Hotel, Kereta Api, Bus, Rental Mobil, Atraksi, Visa, hingga Paket Tour Eksklusif." },
              { icon: Smartphone, title: "Modern & Responsif", desc: "Desain UI/UX premium yang beradaptasi sempurna di layar HP, Tablet, maupun Desktop. Memberikan kesan mewah dan profesional." },
              { icon: Zap, title: "Performa Tinggi (Next.js)", desc: "Dibangun menggunakan teknologi web tercanggih (Next.js App Router) menjamin loading secepat kilat dan SEO yang optimal." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 3: Frontend Features */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-300 font-bold text-sm mb-6">
              <Search size={16} /> Frontend / Customer App
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Pengalaman Pemesanan<br/>Tanpa Hambatan</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Memanjakan pelanggan dengan fitur cerdas yang mempermudah pencarian dan transaksi lintas negara.
            </p>
            <ul className="space-y-4">
              {[
                "Globalisasi: Dukungan 2 Bahasa (ID & EN) secara instan.",
                "Multi-Currency: Konversi kurs real-time (IDR & USD).",
                "Smart Search: Sistem pencarian multi-kategori yang dinamis.",
                "Checkout Cepat: Form pemesanan yang rapi dengan opsi Asuransi.",
                "Cross-Selling: Rekomendasi Promo & Paket Tour Eksklusif."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            {/* Mockup visual representation */}
            <div className="bg-slate-800 border border-slate-700 p-2 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-[4/3] flex flex-col">
                <div className="h-8 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-8 bg-slate-700 rounded-lg w-1/3"></div>
                  <div className="h-32 bg-gradient-to-r from-primary/50 to-blue-600/50 rounded-xl"></div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-16 bg-slate-700 rounded-xl"></div><div className="h-16 bg-slate-700 rounded-xl"></div>
                    <div className="h-16 bg-slate-700 rounded-xl"></div><div className="h-16 bg-slate-700 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Backend Admin Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="bg-slate-100 border border-slate-200 p-2 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl overflow-hidden aspect-[4/3] flex border border-slate-100">
                <div className="w-1/4 bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-3">
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-blue-100 rounded-lg w-full"></div>
                  <div className="h-8 bg-slate-200 rounded-lg w-full"></div>
                  <div className="h-8 bg-slate-200 rounded-lg w-full"></div>
                </div>
                <div className="w-3/4 p-6 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-20 bg-emerald-50 rounded-xl border border-emerald-100"></div>
                    <div className="h-20 bg-blue-50 rounded-xl border border-blue-100"></div>
                    <div className="h-20 bg-amber-50 rounded-xl border border-amber-100"></div>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
              <LayoutDashboard size={16} /> Backend / Admin Super-App
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">Kontrol Penuh di<br/>Ujung Jari Anda</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Sistem manajemen enterprise yang memungkinkan Anda mengelola seluruh operasional OTA dari satu dashboard.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Live Dashboard", desc: "Pantau revenue, KPI, dan transaksi terbaru secara real-time." },
                { title: "Order Management", desc: "Sistem approval, pembatalan, dan refund dengan fitur Export CSV." },
                { title: "Inventory & CMS", desc: "Kelola Hotel, Penerbangan, Tour, Banner, hingga Artikel Blog." },
                { title: "Finance Tracking", desc: "Catat pengeluaran operasional dan pantau Net Profit otomatis." },
                { title: "Dynamic Settings", desc: "Atur margin harga (markup API) dan preferensi global langsung dari dashboard." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition">
                  <div className="mt-1 bg-white shadow-sm p-1 rounded text-primary"><ShieldCheck size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Slide 5: Tech Stack & Architecture */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mb-6">
            <Database size={16} /> Teknologi Enterprise
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Arsitektur Siap Skala</h2>
          <p className="text-lg text-slate-600">Dibangun menggunakan fondasi teknologi modern standar industri, menjamin keamanan, kecepatan, dan kemudahan pengembangan ke depan.</p>
        </div>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { name: "Next.js 14", desc: "React Framework", color: "text-slate-900" },
            { name: "Prisma ORM", desc: "Database Toolkit", color: "text-blue-600" },
            { name: "Tailwind CSS", desc: "Styling Engine", color: "text-cyan-500" },
            { name: "TypeScript", desc: "Type Safety", color: "text-blue-500" }
          ].map((tech, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className={`text-2xl font-black mb-1 ${tech.color}`}>{tech.name}</h3>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 6: Call to Action */}
      <section className="py-24 px-6 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Siap Mengubah Bisnis Travel Anda?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Mulai gunakan Flamboyan OTA Super-App hari ini dan tingkatkan penjualan serta efisiensi operasional bisnis Anda.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="px-8 py-4 bg-white text-primary hover:bg-slate-50 rounded-2xl font-bold text-lg shadow-lg transition-all">
              Buka Homepage
            </Link>
            <Link href="/admin" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 rounded-2xl font-bold text-lg shadow-lg transition-all">
              Buka Admin Dashboard
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm bg-slate-900">
        &copy; 2026 Flamboyan Tour & Travel. Blueprint Project.
      </footer>
    </div>
  );
}
