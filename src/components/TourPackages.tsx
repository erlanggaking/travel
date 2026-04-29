"use client";

import { MapPin, Clock, Star, ChevronRight, Loader2 } from "lucide-react";
import { TourPackage } from "@/data/mockData";
import { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function TourPackages() {
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 flex justify-center">
        <Loader2 className="animate-spin text-gray-300" size={40} />
      </div>
    );
  }

  if (tours.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-[#ef2324]"></span>
            <span className="text-[#ef2324] font-bold text-xs tracking-widest uppercase">{t("limitedOffer")}</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t("popularPackages")}</h2>
          <p className="text-gray-500 mt-2">{language === "ID" ? "Jelajahi destinasi impian dengan layanan in-house terbaik dari Flamboyan." : "Explore dream destinations with the best in-house services from Flamboyan."}</p>
        </div>
        <button className="flex items-center gap-1 text-[#ef2324] font-bold text-sm hover:underline">
          {t("viewAll")} <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={tour.imageUrl} 
                alt={tour.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                <span className="text-[10px] font-black text-[#ef2324] tracking-tighter">{tour.tag}</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs font-bold">{tour.rating}</span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-2 font-medium">
                <MapPin size={12} />
                {tour.location}
              </div>
              <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#ef2324] transition-colors mb-3 line-clamp-2">
                {tour.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                <Clock size={12} />
                {tour.duration}
              </div>
              
              <div className="mt-auto pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{language === "ID" ? "Mulai Dari" : "Starting From"}</p>
                  <p className="text-[#ef2324] font-black text-lg">{formatPrice(tour.price)}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#ef2324] group-hover:text-white transition-all shadow-inner">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
