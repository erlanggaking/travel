"use client";

import { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Search, X, Loader2, ShoppingBag } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/api/customers").then(r => r.json()).then(d => { setCustomers(d); setLoading(false); });
  }, []);

  const filtered = customers.filter(c => !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()));
  const fmtPrice = (n: number) => `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
  const statusColors: Record<string, string> = { PAID: "bg-green-100 text-green-700", PENDING: "bg-orange-100 text-orange-700", CANCELLED: "bg-gray-200 text-gray-600", REFUNDED: "bg-red-100 text-red-700" };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">Data pelanggan dan riwayat transaksi.</p>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200 max-w-xs">
          <Search size={18} className="text-gray-400 mr-2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, email..." className="bg-transparent border-none outline-none w-full text-sm" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cust, i) => (
            <div key={i} onClick={() => setSelected(cust)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center"><UserCircle size={32} /></div>
                <div>
                  <h3 className="font-bold text-gray-800">{cust.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md mt-1 inline-block">{cust.totalOrders} Pesanan</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-sm text-gray-600 flex items-center gap-2"><Mail size={16} className="text-gray-400" /> {cust.email}</p>
                {cust.phone && <p className="text-sm text-gray-600 flex items-center gap-2"><Phone size={16} className="text-gray-400" /> {cust.phone}</p>}
                {cust.location && <p className="text-sm text-gray-600 flex items-center gap-2"><MapPin size={16} className="text-gray-400" /> {cust.location}</p>}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-500">Total Spent</span>
                <span className="text-lg font-bold text-orange-500">{fmtPrice(cust.totalSpent)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 text-primary rounded-full flex items-center justify-center"><UserCircle size={36} /></div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{selected.name}</h3>
                  <p className="text-sm text-gray-500">{selected.email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 border-b">
              <div className="text-center"><p className="text-2xl font-bold text-gray-800">{selected.totalOrders}</p><p className="text-xs text-gray-400">Total Orders</p></div>
              <div className="text-center"><p className="text-2xl font-bold text-orange-500">{fmtPrice(selected.totalSpent)}</p><p className="text-xs text-gray-400">Total Spent</p></div>
              <div className="text-center"><p className="text-2xl font-bold text-gray-800">{selected.totalOrders > 0 ? fmtPrice(Math.round(selected.totalSpent / selected.totalOrders)) : "—"}</p><p className="text-xs text-gray-400">Avg Order</p></div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><ShoppingBag size={18} /> Riwayat Pesanan</h4>
              {selected.bookings?.length === 0 ? <p className="text-sm text-gray-400">Belum ada pesanan.</p> : (
                <div className="flex flex-col gap-3">
                  {selected.bookings?.map((b: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{b.productName}</p>
                        <p className="text-xs text-gray-400 mt-1">{b.type} • {new Date(b.createdAt).toLocaleDateString("id-ID")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">{fmtPrice(b.totalPrice)}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors[b.status]}`}>{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
