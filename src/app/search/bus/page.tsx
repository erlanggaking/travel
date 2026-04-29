import SearchBox from "@/components/SearchBox";
import { Bus, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function BusSearch() {
  const buses = [
    { id: 1, operator: "Sinar Jaya", class: "Executive", price: 250000, departure: "Jakarta", arrival: "Yogyakarta", time: "19:00 - 05:00", duration: "10j 0m" },
    { id: 2, operator: "Pahala Kencana", class: "Super Executive", price: 350000, departure: "Jakarta", arrival: "Yogyakarta", time: "20:00 - 06:30", duration: "10j 30m" },
    { id: 3, operator: "Rosalia Indah", class: "First Class", price: 450000, departure: "Jakarta", arrival: "Yogyakarta", time: "18:30 - 04:30", duration: "10j 0m" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#00D045] pt-8 pb-12">
        <SearchBox initialCategory="bus" compact />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Jakarta → Yogyakarta</h1>
          <p className="text-sm text-gray-500">Kam, 15 Agt 2026 • 1 Penumpang</p>
        </div>

        <div className="flex flex-col gap-4">
          {buses.map((bus) => (
            <div key={bus.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col items-center w-full md:w-40">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Bus className="text-[#00D045]" size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-700 text-center">{bus.operator}</p>
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">{bus.class}</span>
              </div>

              <div className="flex-1 flex items-center justify-between w-full h-full border-y md:border-y-0 md:border-x border-gray-100 py-4 md:py-0 md:px-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">{bus.time.split(' - ')[0]}</p>
                  <p className="text-xs text-gray-500">{bus.departure}</p>
                </div>
                <div className="flex flex-col items-center flex-1 px-4 text-gray-400">
                  <span className="text-xs font-medium mb-1">{bus.duration}</span>
                  <div className="w-full border-t-2 border-dotted border-gray-300 relative">
                    <MapPin size={14} className="absolute -top-[9px] left-1/2 -translate-x-1/2 text-[#00D045]" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">{bus.time.split(' - ')[1]}</p>
                  <p className="text-xs text-gray-500">{bus.arrival}</p>
                </div>
              </div>

              <div className="w-full md:w-48 flex flex-col items-end md:items-center justify-center">
                <p className="text-xl font-extrabold text-[#00D045] mb-3">
                  Rp {bus.price.toLocaleString("id-ID")}
                </p>
                <Link href="/booking" className="w-full text-center bg-[#00D045] hover:bg-[#00b93d] text-white font-semibold py-2 px-4 rounded-xl transition">
                  Pilih
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
