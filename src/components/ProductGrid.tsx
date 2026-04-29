"use client";

import { Plane, Building, Train, Bus, Car, CreditCard, Ticket, Umbrella } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function ProductGrid() {
  const { t } = useSettings();

  const products = [
    { name: t("flight"), icon: Plane, path: "/search/flights", color: "bg-[#0194F3]" },
    { name: t("hotel"), icon: Building, path: "/search/hotels", color: "bg-[#715DFF]" },
    { name: t("train"), icon: Train, path: "/search/trains", color: "bg-[#FF5E1F]" },
    { name: t("bus"), icon: Bus, path: "/search/bus", color: "bg-[#00D045]" },
    { name: t("car"), icon: Car, path: "/search/car", color: "bg-[#00BD9D]" },
    { name: t("activity"), icon: Ticket, path: "/search/activity", color: "bg-[#FF3030]" },
    { name: t("visa"), icon: CreditCard, path: "/search/visa", color: "bg-[#B75DFF]" },
    { name: t("tours"), icon: Umbrella, path: "/search/tours", color: "bg-[#FF30A2]" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
        {products.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Link href={p.path} key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className={`w-14 h-14 md:w-16 md:h-16 ${p.color} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:-translate-y-1 transition-transform`}>
                <Icon size={28} />
              </div>
              <span className="mt-2 text-sm text-center font-medium text-gray-700">{p.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
