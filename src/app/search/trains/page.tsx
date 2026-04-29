import SearchBox from "@/components/SearchBox";
import { Train, Clock, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";

export default function TrainsSearch() {
  const trains = [
    { id: 1, name: "Argo Bromo Anggrek", class: "Eksekutif", price: 650000, duration: "8j 10m", time: "08:00 - 16:10", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg/1200px-Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg.png" },
    { id: 2, name: "Taksaka", class: "Luxury", price: 1200000, duration: "6j 20m", time: "09:15 - 15:35", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg/1200px-Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg.png" },
    { id: 3, name: "Gajayana", class: "Eksekutif", price: 700000, duration: "12j 30m", time: "18:40 - 07:10", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg/1200px-Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#FF5E1F] pt-8 pb-12">
        <SearchBox initialCategory="train" compact />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Gambir (GMR) → Surabaya Pasarturi (SBI)</h1>
          <p className="text-sm text-gray-500">Kam, 15 Agt 2026 • 1 Penumpang</p>
        </div>

        <div className="flex flex-col gap-4">
          {trains.map((train) => (
            <div key={train.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col items-center w-full md:w-32">
                <img src={train.logo} alt="KAI" className="h-10 w-auto object-contain mb-2" />
                <p className="text-sm font-semibold text-gray-700 text-center">{train.name}</p>
                <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">{train.class}</span>
              </div>

              <div className="flex-1 flex items-center justify-between w-full h-full border-y md:border-y-0 md:border-x border-gray-100 py-4 md:py-0 md:px-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">{train.time.split(' - ')[0]}</p>
                  <p className="text-xs text-gray-500">GMR</p>
                </div>
                <div className="flex flex-col items-center flex-1 px-4 text-gray-400">
                  <span className="text-xs font-medium mb-1">{train.duration}</span>
                  <div className="w-full border-t-2 border-dotted border-gray-300 relative">
                    <Train size={14} className="absolute -top-[9px] left-1/2 -translate-x-1/2 text-[#FF5E1F]" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">{train.time.split(' - ')[1]}</p>
                  <p className="text-xs text-gray-500">SBI</p>
                </div>
              </div>

              <div className="w-full md:w-48 flex flex-col items-end md:items-center justify-center">
                <p className="text-xl font-extrabold text-[#FF5E1F] mb-3">
                  Rp {train.price.toLocaleString("id-ID")}
                </p>
                <Link href="/booking" className="w-full text-center bg-[#FF5E1F] hover:bg-[#e54d14] text-white font-semibold py-2 px-4 rounded-xl transition">
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
