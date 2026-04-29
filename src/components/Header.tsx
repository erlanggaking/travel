"use client";

import Link from "next/link";
import { Search, Globe, User, ChevronDown, Check } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { language, currency, setLanguage, setCurrency, t } = useSettings();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-1 rounded-lg">
            <Globe size={24} />
          </div>
          <span className="text-xl font-bold text-primary">Flamboyan</span>
        </Link>

        {/* Static Search Bar - hidden on mobile */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full w-96 max-w-full">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50 px-2 lg:px-3 py-2 rounded-xl transition-all"
            >
              <Globe size={18} className="mr-1 lg:mr-2 text-primary" />
              <span className="uppercase text-xs lg:text-sm">{language} | {currency}</span>
              <ChevronDown size={14} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{language === "ID" ? "Bahasa" : "Language"}</p>
                  <div className="space-y-1">
                    {[
                      { id: "ID", label: "Bahasa Indonesia", flag: "🇮🇩" },
                      { id: "EN", label: "English", flag: "🇺🇸" }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => { setLanguage(lang.id as any); setIsDropdownOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
                      >
                        <span className="flex items-center gap-2"><span>{lang.flag}</span> {lang.label}</span>
                        {language === lang.id && <Check size={14} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-50 my-1"></div>
                <div className="p-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{language === "ID" ? "Mata Uang" : "Currency"}</p>
                  <div className="space-y-1">
                    {[
                      { id: "IDR", label: "Indonesian Rupiah", symbol: "Rp" },
                      { id: "USD", label: "US Dollar", symbol: "$" }
                    ].map((curr) => (
                      <button
                        key={curr.id}
                        onClick={() => { setCurrency(curr.id as any); setIsDropdownOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
                      >
                        <span className="flex items-center gap-2"><span className="w-5 text-center font-bold text-gray-400">{curr.symbol}</span> {curr.label}</span>
                        {currency === curr.id && <Check size={14} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Link href="/admin" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#017bc7] transition-all shadow-md shadow-blue-100">
            <User size={18} />
            <span className="hidden sm:inline">{t("loginRegister")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
