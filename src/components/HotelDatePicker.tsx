"use client";

import { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface HotelDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRange: (range: string) => void;
}

export default function HotelDatePicker({ isOpen, onClose, onSelectRange }: HotelDatePickerProps) {
  const { t, language } = useSettings();
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 3, 30));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 4, 1));
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026
  const today = new Date(2026, 3, 29);

  if (!isOpen) return null;

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  const locale = language === "ID" ? "id-ID" : "en-US";
  
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString(locale, { month: "short" });
  };

  const months = [
    { date: currentMonth, name: getMonthName(currentMonth), year: currentMonth.getFullYear() },
    { date: nextMonth, name: getMonthName(nextMonth), year: nextMonth.getFullYear() },
  ];

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
        const startStr = `${startDate.getDate()} ${getMonthName(startDate)} ${startDate.getFullYear()}`;
        const endStr = `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`;
        onSelectRange(`${startStr} - ${endStr}`);
        // Keep modal open for a moment or close it? The image suggests it's a selection process.
      }
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isStart = (date: Date) => startDate?.getTime() === date.getTime();
  const isEnd = (date: Date) => endDate?.getTime() === date.getTime();

  const generateDays = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) days.push({ day: 0, current: false });
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, current: true });
    return days;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-lg text-gray-800">{t("stayDate")}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        {/* Selected Range Display */}
        <div className="grid grid-cols-2 border-b border-gray-100">
          <div className="p-4 border-r border-gray-100">
            <div className="text-xs font-bold text-gray-400 mb-1">{t("checkIn")}</div>
            <div className="text-sm font-bold text-gray-800">
              {startDate ? startDate.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-bold text-gray-400 mb-1">{t("checkOut")}</div>
            <div className="text-sm font-bold text-gray-800">
              {endDate ? endDate.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row p-6 gap-12 relative">
          {/* Navigation */}
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="absolute left-8 top-12 p-1 text-gray-400 hover:text-gray-600"><ArrowLeft size={18} /></button>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="absolute right-8 top-12 p-1 text-gray-400 hover:text-gray-600"><ArrowRight size={18} /></button>

          {months.map((m, idx) => (
            <div key={idx} className="flex-1">
              <div className="text-center font-bold text-gray-800 mb-6">{m.name} {m.year}</div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] font-bold text-gray-400 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                  <div key={d} className={d === "Sun" ? "text-red-500" : ""}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {generateDays(m.date).map((day, i) => {
                  const dateToCheck = new Date(m.date.getFullYear(), m.date.getMonth(), day.day);
                  const isPast = day.current && dateToCheck < today;
                  const active = day.current && !isPast;
                  const selectedStart = active && isStart(dateToCheck);
                  const selectedEnd = active && isEnd(dateToCheck);
                  const range = active && isInRange(dateToCheck);

                  return (
                    <div key={i} className={`relative h-10 flex items-center justify-center ${range ? "bg-[#0194F3]/10" : ""}`}>
                      {range && <div className="absolute inset-0 bg-[#0194F3]"></div>}
                      {selectedStart && <div className="absolute left-1/2 right-0 inset-y-0 bg-[#0194F3]"></div>}
                      {selectedEnd && <div className="absolute left-0 right-1/2 inset-y-0 bg-[#0194F3]"></div>}
                      
                      <button
                        disabled={!active}
                        onClick={() => handleDateClick(dateToCheck)}
                        className={`
                          relative z-10 w-10 h-10 flex items-center justify-center text-sm transition-all
                          ${day.current ? (isPast ? "text-gray-200 cursor-not-allowed" : "text-gray-800 hover:bg-gray-100") : "text-transparent"}
                          ${selectedStart || selectedEnd ? "bg-[#0194F3] text-white font-bold rounded-full shadow-lg" : ""}
                          ${range ? "text-[#0194F3] font-bold" : ""}
                          ${day.current && !isPast && !selectedStart && !selectedEnd && !range && m.name === "Mei" && [5, 7, 10, 17, 18, 20, 21, 24, 25].includes(day.day) ? "border border-[#00b18f] rounded-full text-[#00b18f]" : ""}
                        `}
                      >
                        {day.day || ""}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-md transition-all">{t("cancel")}</button>
          <button 
            disabled={!startDate || !endDate}
            onClick={onClose}
            className={`px-8 py-2 text-sm font-bold text-white rounded-md transition-all ${startDate && endDate ? "bg-[#0194F3] hover:bg-[#0074c2]" : "bg-gray-300 cursor-not-allowed"}`}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
