"use client";

import SearchBox from "@/components/SearchBox";
import { CreditCard, Globe, ShieldCheck, FileText, Clock } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function VisaSearch() {
  const { formatPrice, t } = useSettings();
  const visas = [
    { id: 1, country: "Jepang", type: "E-Visa Turis", price: 650000, duration: "5-7 Hari Kerja", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop" },
    { id: 2, country: "Korea Selatan", type: "Visa Turis (C-3-9)", price: 950000, duration: "10-14 Hari Kerja", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop" },
    { id: 3, country: "Australia", type: "Visitor Visa (Subclass 600)", price: 2100000, duration: "20-30 Hari Kerja", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=250&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#B75DFF] pt-8 pb-12">
        <SearchBox initialCategory="visa" compact />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800">Layanan Pengurusan Visa</h1>
            <p className="text-gray-500 mt-1">Proses mudah, aman, dan dibantu oleh tim ahli kami.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#B75DFF] mb-1">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-400">AMAN</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#B75DFF] mb-1">
                <FileText size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-400">LENGKAP</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#B75DFF] mb-1">
                <Globe size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-400">GLOBAL</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <div key={visa.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all flex flex-col group border-b-4 border-b-transparent hover:border-b-[#B75DFF]">
              <div className="h-44 overflow-hidden">
                <img src={visa.image} alt={visa.country} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-gray-800 mb-1">Visa {visa.country}</h3>
                <p className="text-sm text-gray-500 mb-6">{visa.type}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={16} className="text-[#B75DFF]" />
                    <span>Estimasi: <b>{visa.duration}</b></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck size={16} className="text-[#B75DFF]" />
                    <span>Termasuk Biaya Konsulat</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t("startingFrom")}</p>
                    <p className="text-2xl font-black text-[#B75DFF]">{formatPrice(visa.price)}</p>
                  </div>
                  <Link href="/booking" className="bg-[#B75DFF] hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-2xl transition shadow-lg shadow-purple-200">
                    Pesan
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
