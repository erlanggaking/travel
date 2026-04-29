"use client";

import { useState } from "react";
import { Plane, Calendar, Users, ChevronDown, ArrowRightLeft, Search, Minus, Plus, ChevronUp, Building, TrainFront, Bus, Car, Ticket, MoreHorizontal, LayoutGrid, MapPin, Umbrella, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import DatePickerModal from "./DatePickerModal";
import HotelDatePicker from "./HotelDatePicker";
import GuestSelector from "./GuestSelector";

type TripType = "sekali-jalan" | "pulang-pergi" | "banyak-kota";

interface SearchBoxProps {
  initialCategory?: "hotel" | "flight" | "train" | "bus" | "car" | "activity" | "visa" | "tours";
  compact?: boolean;
}

export default function SearchBox({ initialCategory = "flight", compact = false }: SearchBoxProps) {
  const { language, currency, t } = useSettings();
  const [activeCategory, setActiveCategory] = useState<"hotel" | "flight" | "train" | "bus" | "car" | "activity" | "visa" | "tours">(initialCategory);
  const [tripType, setTripType] = useState<TripType>("sekali-jalan");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [counts, setCounts] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isHotelDatePickerOpen, setIsHotelDatePickerOpen] = useState(false);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
  
  const [activeDateField, setActiveDateField] = useState<"pergi" | "pulang">("pergi");
  const [dates, setDates] = useState({
    pergi: "",
    pulang: "",
  });

  const [hotelData, setHotelData] = useState({
    destination: "Yogyakarta",
    dates: "30 Apr 2026 - 01 May 2026",
    guests: "2 Adult(s), 0 Child, 1 Room",
  });

  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
  });

  // Multi-city state
  const [activeFlightIndex, setActiveFlightIndex] = useState(0);
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);
  
  const [preferredAirline, setPreferredAirline] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    const paths: Record<string, string> = {
      hotel: "/search/hotels",
      flight: "/search/flights",
      train: "/search/trains",
      bus: "/search/bus",
      car: "/search/car",
      activity: "/search/activity",
      visa: "/search/visa",
      tours: "/search/tours",
    };
    router.push(paths[activeCategory] || "/search/flights");
  };

  const handleHotelSearch = () => {
    router.push("/search/hotels");
  };

  const updateCount = (type: keyof typeof counts, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const openDatePicker = (field: "pergi" | "pulang") => {
    setActiveDateField(field);
    setIsDatePickerOpen(true);
  };

  const handleSelectDate = (date: string) => {
    if (tripType === "banyak-kota") {
      const newFlights = [...multiCityFlights];
      newFlights[activeFlightIndex].date = date;
      setMultiCityFlights(newFlights);
    } else {
      setDates((prev) => ({
        ...prev,
        [activeDateField]: date,
      }));
    }
  };

  const addFlight = () => {
    if (multiCityFlights.length < 5) {
      setMultiCityFlights([...multiCityFlights, { from: "", to: "", date: "" }]);
      setActiveFlightIndex(multiCityFlights.length);
    }
  };

  const updateSearchField = (field: "from" | "to", value: string) => {
    if (activeCategory === "flight" && tripType === "banyak-kota") {
      const newFlights = [...multiCityFlights];
      newFlights[activeFlightIndex][field] = value;
      setMultiCityFlights(newFlights);
    } else {
      setSearchData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const tabs = [
    { id: "sekali-jalan", label: t("oneWay") },
    { id: "pulang-pergi", label: t("roundTrip") },
    { id: "banyak-kota", label: t("multiCity") },
  ];

  const categories = [
    { id: "hotel", label: t("hotel"), icon: Building },
    { id: "flight", label: t("flight"), icon: Plane },
    { id: "train", label: t("train"), icon: TrainFront, badge: "New! Whoosh" },
    { id: "bus", label: t("bus"), icon: Bus },
    { id: "car", label: t("car"), icon: Car },
    { id: "activity", label: t("activity"), icon: Ticket },
    { id: "visa", label: t("visa"), icon: CreditCard },
    { id: "tours", label: t("tours"), icon: Umbrella },
  ];

  return (
    <div className={`max-w-6xl mx-auto px-4 relative z-20 ${compact ? "pt-8 mb-4" : "-mt-24"}`}>
      {/* Category Navigation */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap relative ${
              activeCategory === cat.id
                ? "bg-white text-gray-800 shadow-md"
                : "text-white hover:bg-white/10"
            }`}
          >
            <cat.icon size={18} />
            {cat.label}
            {cat.badge && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-[8px] text-gray-900 px-1.5 py-0.5 rounded-full font-black animate-bounce">
                {cat.badge}
              </span>
            )}
          </button>
        ))}
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all">
          <MoreHorizontal size={18} />
          More
        </button>
      </div>

      <div className="flex justify-between items-end mb-0 px-2">
        {activeCategory === "flight" && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">{t("bookYourFlight")}</h2>
            <div className="flex bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTripType(tab.id as TripType)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors border-r last:border-r-0 ${
                    tripType === tab.id
                      ? "bg-[#00b18f] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </>
        )}
        {activeCategory === "hotel" && (
          <div className="flex gap-2 mb-4">
            {["All", "Hotels", "Villa", "Apartment"].map((sub, i) => (
              <button
                key={sub}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  i === 0 ? "bg-[#0194F3] text-white" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-b-xl rounded-tl-xl shadow-2xl p-6 border border-gray-200">
        {activeCategory === "hotel" ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_auto] gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-inner">
              {/* Destination */}
              <div className="bg-white p-4 group cursor-pointer hover:bg-gray-50 transition-all">
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">{t("hotelSearchLabel")}</label>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-[#0194F3]" />
                  <input
                    type="text"
                    value={hotelData.destination}
                    onChange={(e) => setHotelData({ ...hotelData, destination: e.target.value })}
                    placeholder="Yogyakarta"
                    className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Dates */}
              <div 
                onClick={() => setIsHotelDatePickerOpen(true)}
                className="bg-white p-4 group cursor-pointer hover:bg-gray-50 transition-all border-l border-gray-200"
              >
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">Check-in & Check-out Dates</label>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-[#0194F3]" />
                  <div className="text-sm font-bold text-gray-800">{hotelData.dates}</div>
                </div>
              </div>

              {/* Guests */}
              <div 
                onClick={() => setIsGuestSelectorOpen(true)}
                className="bg-white p-4 group cursor-pointer hover:bg-gray-50 transition-all border-l border-gray-200"
              >
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">Guests and Rooms</label>
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-[#0194F3]" />
                  <div className="text-sm font-bold text-gray-800">{hotelData.guests}</div>
                </div>
              </div>

              {/* Search Button */}
              <div 
                onClick={handleHotelSearch}
                className="bg-[#FF5E1F] flex items-center justify-center p-4 cursor-pointer hover:bg-[#e54d14] transition-all"
              >
                <Search size={28} className="text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Multi-city Flight Tabs */}
            {tripType === "banyak-kota" && (
          <div className="flex items-center gap-6 mb-6 border-b border-gray-100 pb-3">
            {multiCityFlights.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFlightIndex(idx)}
                className={`flex items-center gap-2 text-xs font-bold transition-all relative pb-3 -mb-[13px] ${
                  activeFlightIndex === idx 
                    ? "text-[#00b18f] border-b-2 border-[#00b18f]" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Plane size={14} className={activeFlightIndex === idx ? "text-[#00b18f]" : "text-gray-400"} />
                {t("flightNumber")} {idx + 1}
              </button>
            ))}
            {multiCityFlights.length < 5 && (
              <button 
                onClick={addFlight}
                className="flex items-center gap-2 text-xs font-bold text-[#00b18f] hover:text-[#009478] transition-all pb-3 -mb-[13px]"
              >
                {t("addFlight")} <Plus size={14} />
              </button>
            )}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* From & To */}
          <div className="flex flex-col md:flex-row gap-4 items-center relative">
            <div className="w-full flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1 tracking-wider">{t("from")}</label>
              <input
                type="text"
                value={activeCategory === "flight" && tripType === "banyak-kota" ? multiCityFlights[activeFlightIndex].from : searchData.from}
                onChange={(e) => updateSearchField("from", e.target.value)}
                placeholder={t("placeholderMin3")}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b18f]"
              />
            </div>
            
            <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button className="bg-white border border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                <ArrowRightLeft size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="w-full flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1 tracking-wider">{t("to")}</label>
              <input
                type="text"
                value={activeCategory === "flight" && tripType === "banyak-kota" ? multiCityFlights[activeFlightIndex].to : searchData.to}
                onChange={(e) => updateSearchField("to", e.target.value)}
                placeholder={t("placeholderMin3")}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b18f]"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1 tracking-wider">PERGI</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={tripType === "banyak-kota" ? multiCityFlights[activeFlightIndex].date : dates.pergi}
                  onClick={() => openDatePicker("pergi")}
                  placeholder="Pilih Tanggal Pergi"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-[#00b18f] cursor-pointer"
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 border-l border-gray-300 bg-gray-50 rounded-r-md pointer-events-none">
                  <Calendar size={18} className="text-[#00b18f]" />
                </div>
              </div>
            </div>

            {tripType !== "banyak-kota" && (
              <div className={`w-full flex flex-col ${tripType === "sekali-jalan" ? "opacity-50 pointer-events-none" : ""}`}>
                <label className="text-[10px] font-bold text-gray-800 mb-1 tracking-wider">PULANG</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={dates.pulang}
                    onClick={() => openDatePicker("pulang")}
                    placeholder="Pilih Tanggal Pulang"
                    disabled={tripType === "sekali-jalan"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-[#00b18f] cursor-pointer"
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 border-l border-gray-300 bg-gray-50 rounded-r-md pointer-events-none">
                    <Calendar size={18} className="text-[#00b18f]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Passenger Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-[10px] font-bold text-gray-800 tracking-wider">{t("adult")}</label>
              <span className="text-[10px] text-gray-500">12 + {t("yearsOld")}</span>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
              <button onClick={() => updateCount("adult", -1)} className="flex-1 h-full flex items-center justify-center text-[#00b18f] hover:bg-gray-50 transition-colors border-r border-gray-300">
                <Minus size={16} />
              </button>
              <div className="flex-[2] h-full flex items-center justify-center font-bold text-gray-800">{counts.adult}</div>
              <button onClick={() => updateCount("adult", 1)} className="flex-1 h-full flex items-center justify-center text-[#00b18f] hover:bg-gray-50 transition-colors border-l border-gray-300">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-[10px] font-bold text-gray-800 tracking-wider">{t("child")}</label>
              <span className="text-[10px] text-gray-500">2 - {t("under12")}</span>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
              <button onClick={() => updateCount("child", -1)} className="flex-1 h-full flex items-center justify-center text-[#00b18f] hover:bg-gray-50 transition-colors border-r border-gray-300">
                <Minus size={16} />
              </button>
              <div className="flex-[2] h-full flex items-center justify-center font-bold text-gray-800">{counts.child}</div>
              <button onClick={() => updateCount("child", 1)} className="flex-1 h-full flex items-center justify-center text-[#00b18f] hover:bg-gray-50 transition-colors border-l border-gray-300">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-[10px] font-bold text-gray-800 tracking-wider">{t("infant")}</label>
              <span className="text-[10px] text-gray-500">{t("under2")}</span>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
              <button onClick={() => updateCount("infant", -1)} className="flex-1 h-full flex items-center justify-center text-[#00b18f] hover:bg-gray-50 transition-colors border-r border-gray-300">
                <Minus size={16} />
              </button>
              <div className="flex-[2] h-full flex items-center justify-center font-bold text-gray-800">{counts.infant}</div>
              <button onClick={() => updateCount("infant", 1)} className="flex-1 h-full flex items-center justify-center text-[#00b18f] hover:bg-gray-50 transition-colors border-l border-gray-300">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* More Options Toggle */}
        <div className="mb-6">
          <button 
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="flex items-center gap-2 text-[#00b18f] text-sm font-semibold hover:underline"
          >
            {showMoreOptions ? <ChevronUp size={14} className="text-red-500 fill-red-500" /> : <ChevronUp size={14} className="rotate-180 text-red-500 fill-red-500" />}
            {t("showMore")} <span className="text-gray-400 font-normal ml-1">( {t("preferredAirline")} , {t("class")} )</span>
          </button>
        </div>

        {showMoreOptions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1 tracking-wider">{t("preferredAirline")}</label>
              <input
                type="text"
                value={preferredAirline}
                onChange={(e) => setPreferredAirline(e.target.value)}
                placeholder={t("placeholderMin3")}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b18f]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1 tracking-wider">{t("class")}</label>
              <div className="relative">
                <select className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#00b18f]">
                  <option>{t("all")}</option>
                  <option>{t("economy")}</option>
                  <option>{t("business")}</option>
                  <option>{t("firstClass")}</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 border-l border-gray-300 bg-gray-50 rounded-r-md pointer-events-none">
                  <ChevronDown size={18} className="text-[#00b18f]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={handleSearch}
            className="bg-[#ef2324] hover:bg-red-700 text-white px-10 py-3.5 rounded-md font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {activeCategory === "flight" ? t("searchFlights") :
             activeCategory === "train" ? t("searchTrains") :
             activeCategory === "bus" ? t("searchBus") :
             activeCategory === "car" ? t("searchCar") :
             activeCategory === "activity" ? t("searchActivity") :
             activeCategory === "visa" ? t("searchVisa") : t("searchTours")}
          </button>
        </div>
      </>
    )}
  </div>

      <DatePickerModal 
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelectDate={handleSelectDate}
        title={activeDateField === "pergi" ? "Pilih Tanggal Pergi" : "Pilih Tanggal Pulang"}
      />

      <HotelDatePicker
        isOpen={isHotelDatePickerOpen}
        onClose={() => setIsHotelDatePickerOpen(false)}
        onSelectRange={(range) => setHotelData({ ...hotelData, dates: range })}
      />

      <GuestSelector
        isOpen={isGuestSelectorOpen}
        onClose={() => setIsGuestSelectorOpen(false)}
        onSelect={(summary) => setHotelData({ ...hotelData, guests: summary })}
      />
    </div>
  );
}
