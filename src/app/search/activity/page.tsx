"use client";

import SearchBox from "@/components/SearchBox";
import { Ticket, MapPin, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function ActivitySearch() {
  const { formatPrice, t } = useSettings();
  const activities = [
    { id: 1, name: "Waterbom Bali Ticket", location: "Kuta, Bali", price: 350000, rating: 4.8, reviews: 1200, image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400&h=250&fit=crop" },
    { id: 2, name: "Garuda Wisnu Kencana (GWK)", location: "Uluwatu, Bali", price: 125000, rating: 4.7, reviews: 8500, image: "https://images.unsplash.com/photo-1625732125603-579048a6efb0?w=400&h=250&fit=crop" },
    { id: 3, name: "Bali Zoo Explorer", location: "Gianyar, Bali", price: 280000, rating: 4.9, reviews: 3400, image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=400&h=250&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#FF3030] pt-8 pb-12">
        <SearchBox initialCategory="activity" compact />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Atraksi di Bali</h1>
          <p className="text-sm text-gray-500">Semua Kategori • Terpopuler</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => (
            <div key={act.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img src={act.image} alt={act.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-black px-2 py-1 rounded shadow">
                  INSTANT CONFIRMATION
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-[#FF3030] transition-colors">{act.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                  <MapPin size={12} /> {act.location}
                </p>
                
                <div className="flex items-center gap-1 mb-4">
                  <Star size={14} fill="currentColor" className="text-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">{act.rating}</span>
                  <span className="text-xs text-gray-400">({act.reviews} review)</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-extrabold text-[#FF3030]">{formatPrice(act.price)}</p>
                    <p className="text-[10px] text-gray-400">/ orang</p>
                  </div>
                  <Link href="/booking" className="bg-[#FF3030] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-sm">
                    Beli Tiket
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
