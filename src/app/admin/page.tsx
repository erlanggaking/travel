"use client";

import { useEffect, useState } from "react";
import { TrendingUp, ShoppingCart, DollarSign, Package, Users, ArrowUpRight, Loader2, Download, Plane, Building, Umbrella } from "lucide-react";
import Link from "next/link";

interface Stats {
  totalRevenue: number;
  totalRefunds: number;
  netIncome: number;
  totalBookings: number;
  paidBookings: number;
  pendingCount: number;
  cancelledCount: number;
  refundedCount: number;
  activeCustomers: number;
  revenueByType: Record<string, number>;
  last7Days: { date: string; revenue: number }[];
  recentBookings: any[];
  topProducts: { name: string; count: number; revenue: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings/stats")
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  if (!stats) return <p>Failed to load dashboard data.</p>;

  const fmtPrice = (n: number) => `Rp ${(n / 1000000).toFixed(1)}M`;
  const fmtFull = (n: number) => new Intl.NumberFormat("id-ID").format(n);
  const maxRevenue = Math.max(...stats.last7Days.map(d => d.revenue), 1);
  const typeIcons: Record<string, any> = { FLIGHT: Plane, HOTEL: Building, TOUR: Umbrella };
  const statusColors: Record<string, string> = { PAID: "bg-green-100 text-green-700", PENDING: "bg-orange-100 text-orange-700", CANCELLED: "bg-gray-100 text-gray-600", REFUNDED: "bg-red-100 text-red-700" };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Overview Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau performa penjualan dan inventori Anda secara real-time.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: fmtPrice(stats.totalRevenue), icon: DollarSign, color: "bg-emerald-50 text-emerald-600", trend: `${stats.paidBookings} paid` },
          { title: "Total Bookings", value: stats.totalBookings.toString(), icon: ShoppingCart, color: "bg-blue-50 text-blue-600", trend: `${stats.pendingCount} pending` },
          { title: "Active Customers", value: stats.activeCustomers.toString(), icon: Users, color: "bg-violet-50 text-violet-600", trend: "registered" },
          { title: "Net Income", value: fmtPrice(stats.netIncome), icon: TrendingUp, color: "bg-amber-50 text-amber-600", trend: `${stats.refundedCount} refund` },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 font-medium text-sm">{stat.title}</span>
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <span className="text-xs font-medium text-gray-400">{stat.trend}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue (7 Hari Terakhir)</h2>
          <div className="flex items-end gap-3 h-48">
            {stats.last7Days.map((d, i) => {
              const h = maxRevenue > 0 ? (d.revenue / maxRevenue) * 100 : 0;
              const dayName = new Date(d.date).toLocaleDateString("id-ID", { weekday: "short" });
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex justify-center">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap transition-opacity z-10">
                      Rp {fmtFull(d.revenue)}
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-10 rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 group-hover:from-blue-600 group-hover:to-blue-500 transition-all cursor-pointer"
                      style={{ height: `${Math.max(h, 4)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{dayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue by Type */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue by Category</h2>
          <div className="flex flex-col gap-4">
            {Object.entries(stats.revenueByType).map(([type, rev]) => {
              const pct = stats.totalRevenue > 0 ? (rev / stats.totalRevenue) * 100 : 0;
              const Icon = typeIcons[type] || Package;
              const colors = type === "FLIGHT" ? "bg-blue-500" : type === "HOTEL" ? "bg-emerald-500" : "bg-amber-500";
              return (
                <div key={type} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">{type}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">Rp {fmtFull(rev)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${colors} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top Products</h2>
          <div className="flex flex-col gap-3">
            {stats.topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-black">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.count} bookings</p>
                </div>
                <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">Rp {fmtFull(p.revenue || 0)}</span>
              </div>
            ))}
            {stats.topProducts.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No data yet</p>}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
            <Link href="/admin/orders" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentBookings.map((b: any, i: number) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{b.customerName || "—"}</p>
                  <p className="text-xs text-gray-400 truncate">{b.productName}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Rp {fmtFull(b.totalPrice)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors[b.status] || "bg-gray-100 text-gray-600"}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
