"use client";

import { useState } from "react";
import { X, Minus, Plus, Users } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface GuestSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (summary: string) => void;
}

export default function GuestSelector({ isOpen, onClose, onSelect }: GuestSelectorProps) {
  const { t, language } = useSettings();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">{t("guestsRooms")}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">{t("room")}</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="p-1 border rounded text-[#0194F3]"><Minus size={18} /></button>
              <span className="font-bold w-4 text-center">{rooms}</span>
              <button onClick={() => setRooms(rooms + 1)} className="p-1 border rounded text-[#0194F3]"><Plus size={18} /></button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">{t("adult")}</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setAdults(Math.max(1, adults - 1))} className="p-1 border rounded text-[#0194F3]"><Minus size={18} /></button>
              <span className="font-bold w-4 text-center">{adults}</span>
              <button onClick={() => setAdults(adults + 1)} className="p-1 border rounded text-[#0194F3]"><Plus size={18} /></button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">{t("child")}</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-1 border rounded text-[#0194F3]"><Minus size={18} /></button>
              <span className="font-bold w-4 text-center">{children}</span>
              <button onClick={() => setChildren(children + 1)} className="p-1 border rounded text-[#0194F3]"><Plus size={18} /></button>
            </div>
          </div>
          <button 
            onClick={() => {
              const adultStr = language === "ID" ? "Dewasa" : "Adult(s)";
              const childStr = language === "ID" ? "Anak" : "Child";
              const roomStr = language === "ID" ? "Kamar" : "Room";
              onSelect(`${adults} ${adultStr}, ${children} ${childStr}, ${rooms} ${roomStr}`);
              onClose();
            }}
            className="w-full bg-[#0194F3] text-white py-3 rounded-lg font-bold mt-4"
          >
            {t("done")}
          </button>
        </div>
      </div>
    </div>
  );
}
