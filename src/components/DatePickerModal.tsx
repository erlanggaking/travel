"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  title?: string;
}

export default function DatePickerModal({ isOpen, onClose, onSelectDate, title }: DatePickerModalProps) {
  const { t, language } = useSettings();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026
  const today = new Date(2026, 3, 29); // Today is April 29, 2026

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

  const daysOfWeek = language === "ID" ? ["M", "S", "S", "R", "K", "J", "S"] : ["S", "M", "T", "W", "T", "F", "S"];

  const handlePrevMonth = () => {
    const prevDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (prevDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prevDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isPrevDisabled = currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth();

  // Helper to generate days for a month
  const generateDays = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Previous month padding
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: new Date(year, month, -firstDay + i + 1).getDate(), current: false });
    }
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, current: true });
    }
    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, current: false });
    }
    return days;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-gray-700">{title || t("selectDepartureDate")}</h3>
            <span className="text-xs text-[#00b18f] font-medium">{t("indicativePrice")}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">{t("holiday")}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Calendar Body */}
        <div className="flex flex-col md:flex-row relative">
          {/* Navigation Arrows */}
          <div className="absolute left-6 top-6 z-10">
            <button 
              disabled={isPrevDisabled}
              onClick={handlePrevMonth}
              className={`p-2 border rounded-full transition-all ${
                isPrevDisabled 
                  ? "border-gray-100 text-gray-200 cursor-not-allowed" 
                  : "border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
              }`}
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="absolute right-6 top-6 z-10">
            <button 
              onClick={handleNextMonth}
              className="p-2 border border-gray-300 rounded-full text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {months.map((m, monthIdx) => (
            <div key={monthIdx} className={`flex-1 p-6 ${monthIdx === 0 ? "border-r border-gray-100" : ""}`}>
              <div className="text-center mb-6">
                <span className="text-xl font-bold text-gray-800">{m.name}</span>
                <span className="text-xl font-normal text-gray-500 ml-2">{m.year}</span>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="text-center text-xs font-bold text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Days */}
              <div className="grid grid-cols-7 gap-y-1">
                {generateDays(m.date).map((dayObj, idx) => {
                  const dateToCheck = new Date(m.date.getFullYear(), m.date.getMonth(), dayObj.day);
                  const isPast = dateToCheck < today && dayObj.current;
                  const isToday = dayObj.current && m.date.getMonth() === today.getMonth() && dayObj.day === today.getDate();
                  const isSelected = isToday;
                  
                  return (
                    <button
                      key={idx}
                      disabled={isPast || !dayObj.current}
                      onClick={() => {
                        if (dayObj.current && !isPast) {
                          onSelectDate(`${dayObj.day} ${m.name} ${m.year}`);
                          onClose();
                        }
                      }}
                      className={`
                        h-10 w-full flex items-center justify-center text-sm transition-all
                        ${dayObj.current ? (isPast ? "text-gray-300 cursor-not-allowed" : "text-gray-800") : "text-gray-200"}
                        ${isSelected ? "border-2 border-[#00b18f] rounded-md font-bold text-[#00b18f]" : ""}
                        ${dayObj.current && !isSelected && !isPast ? "hover:bg-gray-50" : ""}
                        ${dayObj.current && dayObj.day >= 1 && dayObj.current && !isPast ? "font-bold" : ""}
                      `}
                    >
                      {dayObj.day}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
