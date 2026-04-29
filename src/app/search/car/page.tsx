import SearchBox from "@/components/SearchBox";
import { Car, Fuel, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CarSearch() {
  const cars = [
    { id: 1, name: "Toyota Avanza", type: "MPV", price: 450000, seats: 7, transmission: "Manual", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
    { id: 2, name: "Toyota Innova Zenix", type: "Premium MPV", price: 850000, seats: 7, transmission: "Automatic", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop" },
    { id: 3, name: "Honda Brio", type: "City Car", price: 350000, seats: 5, transmission: "Automatic", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=250&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#00BD9D] pt-8 pb-12">
        <SearchBox initialCategory="car" compact />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Rental Mobil di Bali</h1>
          <p className="text-sm text-gray-500">Kam, 15 Agt 2026 • Tanpa Sopir</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform hover:scale-110" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{car.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{car.type}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Users size={14} /> {car.seats} Kursi
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel size={14} /> {car.transmission}
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-green-500" /> Asuransi
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-extrabold text-[#00BD9D]">Rp {car.price.toLocaleString("id-ID")}</p>
                    <p className="text-[10px] text-gray-400">/ hari</p>
                  </div>
                  <Link href="/booking" className="bg-[#00BD9D] hover:bg-[#00a88c] text-white font-bold py-2 px-6 rounded-xl transition shadow-sm">
                    Sewa
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
