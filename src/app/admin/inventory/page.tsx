"use client";

import { Plus, Search, Edit2, Trash2, X, Save, Loader2, Plane, Building, Umbrella, Tag } from "lucide-react";
import { useState, useEffect } from "react";

type Tab = "tours" | "hotels" | "flights" | "promos";

export default function InventoryPage() {
  const [tab, setTab] = useState<Tab>("tours");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const endpoints: Record<Tab, string> = { tours: "/api/tours", hotels: "/api/hotels", flights: "/api/flights", promos: "/api/promos" };

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch(endpoints[tab]);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : data.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [tab]);

  const defaultForm: Record<Tab, any> = {
    tours: { title: "", location: "", duration: "", price: 0, tag: "RECOMMENDED", quota: 10, imageUrl: "https://images.unsplash.com/photo-1506012733851-46297839fa41?w=600&h=400&fit=crop" },
    hotels: { name: "", location: "", starRating: 4, pricePerNight: 0, imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", facilities: "WiFi,Pool", rating: 4.0, description: "" },
    flights: { airline: "", flightNumber: "", origin: "", destination: "", departureTime: "", arrivalTime: "", price: 0, duration: "", logoUrl: "", class: "Economy", isRefundable: false },
    promos: { title: "", subtitle: "", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=300&fit=crop", color: "#FF5E1F", link: "", isActive: true, order: 0 },
  };

  const openModal = (item?: any) => {
    setEditingItem(item || null);
    setFormData(item ? { ...item } : { ...defaultForm[tab] });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const url = editingItem ? `${endpoints[tab]}/${editingItem.id}` : endpoints[tab];
    const method = editingItem ? "PUT" : "POST";
    const body = { ...formData };
    if (tab === "tours" || tab === "hotels") body.price = Number(body.price || body.pricePerNight || 0);
    if (tab === "hotels") { body.pricePerNight = Number(body.pricePerNight || 0); body.starRating = Number(body.starRating || 4); body.rating = Number(body.rating || 4); }
    if (tab === "flights") body.price = Number(body.price || 0);
    if (tab === "promos") body.order = Number(body.order || 0);

    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    fetchItems();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus item ini?")) return;
    await fetch(`${endpoints[tab]}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "tours", label: "Tour Packages", icon: Umbrella },
    { id: "hotels", label: "Hotels", icon: Building },
    { id: "flights", label: "Flights", icon: Plane },
    { id: "promos", label: "Promos", icon: Tag },
  ];

  const fmtPrice = (n: number) => `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;

  const renderFormFields = () => {
    const inp = (label: string, key: string, type = "text") => (
      <div key={key}>
        <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">{label}</label>
        <input type={type} value={formData[key] ?? ""} onChange={e => setFormData({ ...formData, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0194F3]/20 focus:border-[#0194F3] transition-all text-sm" />
      </div>
    );
    const sel = (label: string, key: string, opts: string[]) => (
      <div key={key}>
        <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">{label}</label>
        <select value={formData[key] ?? ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0194F3]/20 focus:border-[#0194F3] transition-all bg-white text-sm">
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );

    if (tab === "tours") return <>{inp("Judul", "title")}{inp("Lokasi", "location")}{inp("Durasi", "duration")}{inp("Harga (IDR)", "price", "number")}{inp("Kuota", "quota", "number")}{sel("Tag", "tag", ["BEST SELLER", "RECOMMENDED", "LUXURY", "TOP CHOICE", "LIMITED"])}{inp("Image URL", "imageUrl")}</>;
    if (tab === "hotels") return <>{inp("Nama Hotel", "name")}{inp("Lokasi", "location")}{inp("Star Rating", "starRating", "number")}{inp("Harga Per Malam", "pricePerNight", "number")}{inp("Rating", "rating", "number")}{inp("Fasilitas (comma)", "facilities")}{inp("Deskripsi", "description")}{inp("Image URL", "imageUrl")}</>;
    if (tab === "flights") return <>{inp("Airline", "airline")}{inp("Flight Number", "flightNumber")}{inp("Origin", "origin")}{inp("Destination", "destination")}{inp("Departure", "departureTime", "datetime-local")}{inp("Arrival", "arrivalTime", "datetime-local")}{inp("Price", "price", "number")}{inp("Duration", "duration")}{sel("Class", "class", ["Economy", "Business", "First Class"])}{inp("Logo URL", "logoUrl")}</>;
    if (tab === "promos") return <>{inp("Judul", "title")}{inp("Subtitle", "subtitle")}{inp("Image URL", "imageUrl")}{inp("Warna", "color")}{inp("Link", "link")}{inp("Urutan", "order", "number")}</>;
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola produk tour, hotel, penerbangan, dan promo.</p>
        </div>
        <button onClick={() => openModal()} className="bg-[#0194F3] hover:bg-[#017bc7] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-all">
          <Plus size={18} /> Tambah Baru
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${tab === t.id ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl"><p className="font-medium">Belum ada data. Silakan tambah baru.</p></div>
      ) : tab === "flights" ? (
        /* Flights Table */
        <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="px-4 py-3">Flight</th><th className="px-4 py-3">Route</th><th className="px-4 py-3">Class</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Refundable</th><th className="px-4 py-3 text-right">Aksi</th>
            </tr></thead>
            <tbody className="divide-y">
              {items.map(f => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><span className="font-bold text-gray-800">{f.airline}</span><br/><span className="text-xs text-gray-400">{f.flightNumber}</span></td>
                  <td className="px-4 py-3 text-gray-600">{f.origin} → {f.destination}</td>
                  <td className="px-4 py-3 text-gray-600">{f.class}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">{fmtPrice(f.price)}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${f.isRefundable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{f.isRefundable ? "Yes" : "No"}</span></td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2"><button onClick={() => openModal(f)} className="p-2 text-gray-400 hover:text-[#0194F3] hover:bg-blue-50 rounded-lg"><Edit2 size={14}/></button><button onClick={() => handleDelete(f.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Grid for tours, hotels, promos */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
              <div className="relative h-44 w-full">
                <img src={item.imageUrl} alt={item.title || item.name} className="h-full w-full object-cover" />
                {(item.tag || item.status) && <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#ef2324]">{item.tag || (item.isActive ? "ACTIVE" : "INACTIVE")}</div>}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.title || item.name}</h3>
                <p className="text-xs text-gray-400">{item.location || item.subtitle || ""}{item.duration ? ` • ${item.duration}` : ""}</p>
                <p className="text-[#ef2324] font-black text-xl mt-auto">{fmtPrice(item.price || item.pricePerNight || 0)}</p>
                <div className="pt-3 flex justify-between items-center border-t border-gray-50">
                  {item.quota !== undefined && <span className={`text-[10px] font-black px-2 py-1 rounded-md ${item.quota === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>{item.quota === 0 ? "Sold Out" : `${item.quota} Sisa`}</span>}
                  {item.starRating && <span className="text-xs text-yellow-500">{"★".repeat(item.starRating)}</span>}
                  {item.color && <div className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: item.color }} />}
                  <div className="flex gap-2 ml-auto">
                    <button onClick={() => openModal(item)} className="p-2 text-gray-400 hover:text-[#0194F3] hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-xl text-gray-800">{editingItem ? "Edit" : "Tambah Baru"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">{renderFormFields()}</div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3 border-t">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Batal</button>
              <button onClick={handleSave} className="bg-[#0194F3] hover:bg-[#0074c2] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"><Save size={18}/> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
