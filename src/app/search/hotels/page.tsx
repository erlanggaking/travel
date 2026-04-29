"use client";

import { Star, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import SearchBox from "@/components/SearchBox";
import { useSettings } from "@/context/SettingsContext";

export default function HotelsSearch() {
  const { formatPrice, language, t } = useSettings();
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#715DFF] pt-8 pb-12">
        <SearchBox initialCategory="hotel" compact />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-1/4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 sticky top-24">
          <div>
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">{t("filter")}</h3>
            <p className="font-semibold text-sm text-gray-700 mb-2">{t("pricePerNight")}</p>
            <input type="range" className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Rp 300rb</span>
              <span>Rp 2.5jt+</span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">{t("starRating")}</p>
            {[5, 4, 3, 2, 1].map(r => (
              <label key={r} className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-primary" /> 
                <span className="flex text-yellow-500">
                  {Array.from({length: r}).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-2">
          <h1 className="text-xl font-bold text-gray-800">{language === "ID" ? "Hotel di Bali, Indonesia" : "Hotels in Bali, Indonesia"}</h1>
          <p className="text-sm text-gray-500">{language === "ID" ? "Kam, 15 Agt 2026 - Jum, 16 Agt 2026" : "Thu, 15 Aug 2026 - Fri, 16 Aug 2026"} • 1 {t("room")}, 2 {t("guest")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col">
              <div className="relative h-48">
                <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow">
                  <Star size={12} fill="currentColor" className="text-yellow-500" />
                  {hotel.rating} / 5
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{hotel.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 mb-2">
                  <MapPin size={12} /> {hotel.location}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {(hotel.facilities ? hotel.facilities.split(',') : []).slice(0, 3).map((f: string) => (
                    <span key={f} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{f.trim()}</span>
                  ))}
                  {(hotel.facilities ? hotel.facilities.split(',') : []).length > 3 && <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">+{(hotel.facilities ? hotel.facilities.split(',') : []).length - 3}</span>}
                </div>
                
                <div className="mt-auto border-t border-gray-100 pt-3 flex flex-col gap-2">
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-orange-500">{formatPrice(hotel.pricePerNight)}</p>
                    <p className="text-xs text-gray-400">{t("perRoomPerNight")}</p>
                  </div>
                  <Link href="/booking" className="w-full text-center bg-primary hover:bg-[#017bc7] text-white font-semibold py-2 rounded-xl transition">
                    {t("selectRoom")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}
