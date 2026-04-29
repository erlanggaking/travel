"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingDown, TrendingUp, Download, Plus, Trash2, X, Save, Loader2, Wallet, Receipt } from "lucide-react";

export default function FinancePage() {
  const [stats, setStats] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ title: "", amount: 0, category: "OPERATIONAL", notes: "", date: new Date().toISOString().split("T")[0] });

  const fetchData = async () => {
    setLoading(true);
    const [s, e] = await Promise.all([fetch("/api/bookings/stats").then(r => r.json()), fetch("/api/expenses").then(r => r.json())]);
    setStats(s); setExpenses(e); setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const saveExpense = async () => {
    await fetch("/api/expenses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...expenseForm, amount: Number(expenseForm.amount) }) });
    setExpenseModal(false); setExpenseForm({ title: "", amount: 0, category: "OPERATIONAL", notes: "", date: new Date().toISOString().split("T")[0] }); fetchData();
  };

  const deleteExpense = async (id: string) => { if (!confirm("Hapus?")) return; await fetch(`/api/expenses/${id}`, { method: "DELETE" }); fetchData(); };

  const fmtPrice = (n: number) => `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  const exportCSV = () => {
    const rows = [["Type", "Title", "Amount", "Date"], ...expenses.map(e => ["EXPENSE", e.title, e.amount, new Date(e.date).toLocaleDateString("id-ID")])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "finance-report.csv"; a.click();
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  const catColors: Record<string, string> = { OPERATIONAL: "bg-blue-100 text-blue-700", MARKETING: "bg-purple-100 text-purple-700", SALARY: "bg-emerald-100 text-emerald-700", OTHER: "bg-gray-100 text-gray-600" };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Finance</h1>
          <p className="text-sm text-gray-500 mt-1">Laporan keuangan dan manajemen pengeluaran.</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-primary hover:bg-[#017bc7] text-white px-4 py-2 rounded-xl text-sm font-semibold transition"><Download size={16} /> Export CSV</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Gross Revenue", value: fmtPrice(stats?.totalRevenue || 0), icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
          { title: "Total Refunds", value: fmtPrice(stats?.totalRefunds || 0), icon: TrendingDown, color: "bg-red-50 text-red-600" },
          { title: "Total Expenses", value: fmtPrice(totalExpenses), icon: Receipt, color: "bg-amber-50 text-amber-600" },
          { title: "Net Profit", value: fmtPrice((stats?.totalRevenue || 0) - (stats?.totalRefunds || 0) - totalExpenses), icon: TrendingUp, color: "bg-violet-50 text-violet-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 font-medium text-sm">{s.title}</span>
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}><s.icon size={20} /></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue by Category</h2>
          <div className="flex flex-col gap-4">
            {Object.entries(stats?.revenueByType || {}).map(([type, rev]: [string, any]) => {
              const pct = stats.totalRevenue > 0 ? (rev / stats.totalRevenue) * 100 : 0;
              const colors = type === "FLIGHT" ? "bg-blue-500" : type === "HOTEL" ? "bg-emerald-500" : "bg-amber-500";
              return (
                <div key={type} className="flex flex-col gap-2">
                  <div className="flex justify-between"><span className="text-sm font-semibold text-gray-700">{type}</span><span className="text-sm font-bold text-gray-800">{fmtPrice(rev)} ({pct.toFixed(1)}%)</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${colors}`} style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expense by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Expenses by Category</h2>
          <div className="flex flex-col gap-4">
            {["OPERATIONAL", "MARKETING", "SALARY", "OTHER"].map(cat => {
              const catTotal = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
              const pct = totalExpenses > 0 ? (catTotal / totalExpenses) * 100 : 0;
              if (catTotal === 0) return null;
              return (
                <div key={cat} className="flex flex-col gap-2">
                  <div className="flex justify-between"><span className="text-sm font-semibold text-gray-700">{cat}</span><span className="text-sm font-bold text-gray-800">{fmtPrice(catTotal)}</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5"><div className="h-2.5 rounded-full bg-violet-500" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Daftar Pengeluaran</h2>
          <button onClick={() => setExpenseModal(true)} className="flex items-center gap-2 bg-primary hover:bg-[#017bc7] text-white px-4 py-2 rounded-xl text-sm font-semibold transition"><Plus size={16} /> Catat Pengeluaran</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="px-6 py-4">Tanggal</th><th className="px-6 py-4">Deskripsi</th><th className="px-6 py-4">Kategori</th><th className="px-6 py-4">Jumlah</th><th className="px-6 py-4 text-right">Aksi</th>
            </tr></thead>
            <tbody className="divide-y">
              {expenses.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500 text-xs">{new Date(e.date).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{e.title}{e.notes && <span className="text-xs text-gray-400 ml-2">— {e.notes}</span>}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${catColors[e.category]}`}>{e.category}</span></td>
                  <td className="px-6 py-4 font-bold text-red-600">{fmtPrice(e.amount)}</td>
                  <td className="px-6 py-4 text-right"><button onClick={() => deleteExpense(e.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Modal */}
      {expenseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center"><h3 className="font-bold text-lg">Catat Pengeluaran</h3><button onClick={() => setExpenseModal(false)}><X size={20}/></button></div>
            <div className="p-6 flex flex-col gap-4">
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Deskripsi</label><input value={expenseForm.title} onChange={e => setExpenseForm({ ...expenseForm, title: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Jumlah (IDR)</label><input type="number" value={expenseForm.amount} onChange={e => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Kategori</label>
                <select value={expenseForm.category} onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary bg-white">
                  <option value="OPERATIONAL">Operational</option><option value="MARKETING">Marketing</option><option value="SALARY">Salary</option><option value="OTHER">Other</option>
                </select>
              </div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Tanggal</label><input type="date" value={expenseForm.date} onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Catatan</label><input value={expenseForm.notes} onChange={e => setExpenseForm({ ...expenseForm, notes: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Opsional" /></div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button onClick={() => setExpenseModal(false)} className="px-4 py-2 text-sm font-bold text-gray-500 rounded-xl hover:bg-gray-100">Batal</button>
              <button onClick={saveExpense} className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Save size={16}/> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
