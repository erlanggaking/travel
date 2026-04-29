"use client";

import { PlaneTakeoff, PlaneLanding, Clock, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import SearchBox from "@/components/SearchBox";
import { useSettings } from "@/context/SettingsContext";

export default function FlightsSearch() {
  const { formatPrice, language, currency, t } = useSettings();
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/flights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(Array.isArray(data) ? data : data.data || []);
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
      <div className="bg-[#0194F3] pt-8 pb-12">
        <SearchBox initialCategory="flight" compact />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-1/4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 sticky top-24">
          <div>
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">{t("filter")}</h3>
            <p className="font-semibold text-sm text-gray-700 mb-2">{t("price")}</p>
            <input type="range" className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{currency === "USD" ? "$50" : "Rp 500rb"}</span>
              <span>{currency === "USD" ? "$300+" : "Rp 3jt+"}</span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">{t("airline")}</p>
            {["Garuda Indonesia", "Lion Air", "Batik Air", "Citilink", "AirAsia"].map(a => (
              <label key={a} className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-primary" /> {a}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Jakarta (JKT) → Bali (DPS)</h1>
            <p className="text-sm text-gray-500">{language === "ID" ? "Kam, 15 Agt 2026" : "Thu, 15 Aug 2026"} • 1 {t("passenger")} • {t("economy")}</p>
          </div>
          <button className="text-primary font-semibold text-sm hover:underline">{t("changeSearch")}</button>
        </div>

        {flights.map((flight) => (
          <div key={flight.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row items-center gap-6">
            
            {/* Airline Logo & Name */}
            <div className="flex flex-col items-center w-full md:w-32">
              <img src={flight.logoUrl} alt={flight.airline} className="h-12 w-12 object-cover rounded-full mb-2" />
              <p className="text-sm font-semibold text-gray-700 text-center">{flight.airline}</p>
            </div>

            {/* Timings */}
            <div className="flex-1 flex items-center justify-between w-full h-full border-y md:border-y-0 md:border-x border-gray-100 py-4 md:py-0 md:px-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-xs text-gray-500">CGK</p>
              </div>
              <div className="flex flex-col items-center flex-1 px-4 text-gray-400">
                <span className="text-xs font-medium mb-1">{flight.duration}</span>
                <div className="w-full border-t-2 border-dotted border-gray-300 relative">
                  <PlaneTakeoff size={14} className="absolute -top-[9px] -left-2 text-primary" />
                  <PlaneLanding size={14} className="absolute -top-[9px] -right-2 text-primary" />
                </div>
                <span className="text-xs mt-1">{t("direct")}</span>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">{new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-xs text-gray-500">DPS</p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="w-full md:w-48 flex flex-col items-end md:items-center justify-center">
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <ShieldCheck size={14} /> <span className="text-xs font-medium">{t("canRefund")}</span>
              </div>
              <p className="text-xl font-extrabold text-orange-500 mb-3">
                {formatPrice(flight.price)}
              </p>
              <Link href="/booking" className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                {t("choose")}
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
