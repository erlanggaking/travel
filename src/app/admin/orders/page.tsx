"use client";

import { useEffect, useState } from "react";
import { Filter, Search, X, Download, Loader2, ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface Booking {
  id: string; type: string; status: string; totalPrice: number; customerName: string; customerEmail: string; customerPhone: string; productName: string; notes: string | null; createdAt: string;
}

const STATUS_TABS = ["ALL", "PENDING", "PAID", "CANCELLED", "REFUNDED"];
const statusColors: Record<string, string> = { PAID: "bg-green-100 text-green-700", PENDING: "bg-orange-100 text-orange-700", CANCELLED: "bg-gray-200 text-gray-600", REFUNDED: "bg-red-100 text-red-700" };

export default function OrdersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const fetchBookings = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (activeTab !== "ALL") params.set("status", activeTab);
    if (search) params.set("search", search);
    const res = await fetch(`/api/bookings?${params}`);
    const data = await res.json();
    setBookings(data.data || []);
    setTotalPages(data.totalPages || 1);
    setTotal(data.total || 0);
    setLoading(false);
  };

  const fetchCounts = async () => {
    const res = await fetch("/api/bookings/stats");
    const data = await res.json();
    setCounts({ ALL: data.totalBookings, PENDING: data.pendingCount, PAID: data.paidBookings, CANCELLED: data.cancelledCount, REFUNDED: data.refundedCount });
  };

  useEffect(() => { fetchBookings(); }, [page, activeTab, search]);
  useEffect(() => { fetchCounts(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchBookings();
    fetchCounts();
    setSelectedBooking(null);
  };

  const exportCSV = () => {
    const headers = ["Order ID", "Customer", "Product", "Amount", "Status", "Date"];
    const rows = bookings.map(b => [b.id.slice(0, 8), b.customerName, b.productName, b.totalPrice, b.status, new Date(b.createdAt).toLocaleDateString("id-ID")]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "orders.csv"; a.click();
  };

  const fmtPrice = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola transaksi pesanan pelanggan.</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-primary hover:bg-[#017bc7] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === tab ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
            {tab} {counts[tab] !== undefined && <span className="ml-1 text-xs opacity-70">({counts[tab]})</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 max-w-md">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Cari ID, Nama, Produk..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><p className="font-medium">Tidak ada pesanan ditemukan.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-800">#{b.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{new Date(b.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{b.customerName}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{b.productName}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{fmtPrice(b.totalPrice)}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${statusColors[b.status]}`}>{b.status}</span></td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelectedBooking(b)} className="text-primary hover:text-[#017bc7] font-semibold text-sm">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">{total} orders total</span>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"><ChevronLeft size={16} /></button>
              <span className="text-sm font-medium text-gray-700">Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Order Detail</h3>
              <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400 text-xs block mb-1">Order ID</span><span className="font-mono font-bold text-gray-800">#{selectedBooking.id.slice(0, 8)}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Status</span><span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColors[selectedBooking.status]}`}>{selectedBooking.status}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Customer</span><span className="font-semibold text-gray-800">{selectedBooking.customerName}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Email</span><span className="text-gray-600">{selectedBooking.customerEmail}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Phone</span><span className="text-gray-600">{selectedBooking.customerPhone}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Type</span><span className="text-gray-600">{selectedBooking.type}</span></div>
                <div className="col-span-2"><span className="text-gray-400 text-xs block mb-1">Product</span><span className="font-semibold text-gray-800">{selectedBooking.productName}</span></div>
                <div className="col-span-2"><span className="text-gray-400 text-xs block mb-1">Total Price</span><span className="text-xl font-extrabold text-orange-500">{fmtPrice(selectedBooking.totalPrice)}</span></div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              {selectedBooking.status === "PENDING" && (
                <>
                  <button onClick={() => updateStatus(selectedBooking.id, "PAID")} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition"><CheckCircle size={16} /> Approve</button>
                  <button onClick={() => updateStatus(selectedBooking.id, "CANCELLED")} className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition"><XCircle size={16} /> Cancel</button>
                </>
              )}
              {selectedBooking.status === "PAID" && (
                <button onClick={() => updateStatus(selectedBooking.id, "REFUNDED")} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition"><RotateCcw size={16} /> Refund</button>
              )}
              <button onClick={() => setSelectedBooking(null)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
