"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => { setSettings(d); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  const inp = (label: string, key: string, hint?: string, type = "text") => (
    <div className="flex flex-col">
      <label className="font-semibold text-gray-700 mb-2">{label}</label>
      <input type={type} value={settings[key] || ""} onChange={e => update(key, e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary max-w-sm text-sm" />
      {hint && <span className="text-xs text-gray-500 mt-1">{hint}</span>}
    </div>
  );

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Konfigurasi platform, mark-up harga, dan preferensi.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold animate-in fade-in duration-300">
            <CheckCircle size={18} /> Settings saved!
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
        <div className="p-6 border-b border-gray-100 bg-gray-50"><h2 className="font-bold text-gray-800">General Settings</h2></div>
        <div className="p-6 flex flex-col gap-6">
          {inp("Nama Platform (OTA)", "platformName")}
          {inp("CS WhatsApp Number", "csWhatsapp", "Nomor ini digunakan untuk Floating WhatsApp Button.")}
        </div>

        <div className="p-6 border-y border-gray-100 bg-gray-50"><h2 className="font-bold text-gray-800">Pricing & Markup (API Aggregator)</h2></div>
        <div className="p-6 flex flex-col gap-6">
          {inp("Markup Tiket Pesawat (%)", "markupFlight", undefined, "number")}
          {inp("Markup Hotel (%)", "markupHotel", undefined, "number")}
          {inp("Markup Tour (%)", "markupTour", undefined, "number")}
        </div>

        <div className="p-6 border-y border-gray-100 bg-gray-50"><h2 className="font-bold text-gray-800">Localization</h2></div>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Default Language</label>
            <select value={settings.defaultLanguage || "ID"} onChange={e => update("defaultLanguage", e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary max-w-sm text-sm bg-white">
              <option value="ID">Indonesia (ID)</option><option value="EN">English (EN)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Default Currency</label>
            <select value={settings.defaultCurrency || "IDR"} onChange={e => update("defaultCurrency", e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary max-w-sm text-sm bg-white">
              <option value="IDR">IDR (Rupiah)</option><option value="USD">USD (Dollar)</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-y border-gray-100 bg-gray-50"><h2 className="font-bold text-gray-800">Notifications</h2></div>
        <div className="p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={settings.emailNotifications === "true"} onChange={e => update("emailNotifications", e.target.checked ? "true" : "false")} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
            <div>
              <span className="font-semibold text-gray-700">Email Notifikasi</span>
              <p className="text-xs text-gray-500 mt-0.5">Kirim email saat ada pesanan baru.</p>
            </div>
          </label>
        </div>

        <div className="p-6 flex justify-end bg-gray-50 border-t border-gray-100">
          <button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-[#017bc7] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 transition">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
