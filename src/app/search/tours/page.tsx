"use client";

import SearchBox from "@/components/SearchBox";
import { MapPin, Clock, Star, ChevronRight, Loader2, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { TourPackage } from "@/data/mockData";

import { useSettings } from "@/context/SettingsContext";

export default function ToursSearch() {
  const { formatPrice, language, t } = useSettings();
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#FF30A2] pt-8 pb-12">
        <SearchBox initialCategory="tours" compact />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-[#FF30A2]" />
                <h3 className="font-bold text-gray-800">Filter</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Destinasi</label>
                  <div className="space-y-2">
                    {["Indonesia", "Jepang", "Turki", "Eropa"].map(loc => (
                      <label key={loc} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-[#FF30A2]">
                        <input type="checkbox" className="rounded border-gray-300 text-[#FF30A2] focus:ring-[#FF30A2]" />
                        {loc}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Harga</label>
                  <input type="range" className="w-full accent-[#FF30A2]" />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>IDR 1jt</span>
                    <span>IDR 50jt+</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Semua Paket Tour</h1>
                <p className="text-sm text-gray-500">{tours.length} Destinasi ditemukan</p>
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 flex justify-center">
                <Loader2 className="animate-spin text-gray-300" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <div key={tour.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={tour.imageUrl} 
                        alt={tour.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                        <span className="text-[10px] font-black text-[#FF30A2] tracking-tighter">{tour.tag}</span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-gray-400 text-xs mb-2 font-medium">
                        <MapPin size={12} />
                        {tour.location}
                      </div>
                      <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#FF30A2] transition-colors mb-3 line-clamp-2">
                        {tour.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock size={12} />
                          {tour.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-gray-700 text-xs font-bold">{tour.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("startingFrom")}</p>
                          <p className="text-[#FF30A2] font-black text-lg">{formatPrice(tour.price)}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF30A2] group-hover:text-white transition-all">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
