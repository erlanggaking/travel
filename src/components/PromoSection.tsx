"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const promos = [
  {
    id: 1,
    title: "Diskon Hotel s.d. 50%",
    subtitle: "Nikmati staycation mewah dengan harga hemat.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    title: "Tiket Pesawat Murah Ke Bali",
    subtitle: "Terbang sekarang mulai dari Rp 400rb-an saja!",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop",
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Promo Kereta Cepat Whoosh",
    subtitle: "Dapatkan cashback 20% khusus pengguna baru.",
    image: "https://images.unsplash.com/photo-1541427468627-a89a96e5c399?w=800&h=400&fit=crop",
    color: "from-orange-500 to-red-600",
  },
];

import { useSettings } from "@/context/SettingsContext";

export default function PromoSection() {
  const { t } = useSettings();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">{t("specialPromo")}</h3>
          <p className="text-gray-500 text-sm mt-1">{t("specialPromoSub")}</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <div 
            key={promo.id} 
            className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <img 
              src={promo.image} 
              alt={promo.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${promo.color} opacity-60 mix-blend-multiply`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <span className="inline-block px-2 py-0.5 bg-yellow-400 text-gray-900 text-[10px] font-black rounded-md mb-2">{t("limitedOffer")}</span>
              <h4 className="text-lg font-bold leading-tight drop-shadow-md">{promo.title}</h4>
              <p className="text-xs text-gray-200 mt-1 line-clamp-1 opacity-90">{promo.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Secondary Promo Banner */}
      <div className="mt-8 relative h-32 md:h-40 rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1506012733851-46297839fa41?w=1600&h=400&fit=crop" 
          alt="Wide Promo" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent flex flex-col justify-center px-8 md:px-12">
          <h3 className="text-xl md:text-3xl font-black text-white">Xperience Baru Setiap Hari</h3>
          <p className="text-white/80 text-sm md:text-lg mt-1 max-w-lg">Cari aktivitas seru dan nikmati diskon khusus pengguna aplikasi.</p>
          <button className="mt-4 w-fit bg-white text-blue-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition-colors">Lihat Detail</button>
        </div>
      </div>
    </section>
  );
}
