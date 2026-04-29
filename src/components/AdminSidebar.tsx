"use client";

import { LayoutDashboard, PackageSearch, ShoppingBag, Settings, LogOut, Users, FileText, Wallet, Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [lastCount, setLastCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/bookings/stats");
        const data = await res.json();
        const newCount = data.pendingCount || 0;
        if (newCount > lastCount && lastCount > 0) {
          setShowNotif(true);
          setTimeout(() => setShowNotif(false), 5000);
        }
        setPendingCount(newCount);
        setLastCount(newCount);
      } catch {}
    };
    fetchPending();
    const interval = setInterval(fetchPending, 30000);
    return () => clearInterval(interval);
  }, [lastCount]);

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: pendingCount },
    { name: "Finance", href: "/admin/finance", icon: Wallet },
    { name: "Inventory", href: "/admin/inventory", icon: PackageSearch },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Content (CMS)", href: "/admin/cms", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 w-full">
        <h2 className="text-lg font-bold text-primary flex items-center gap-2"><LayoutDashboard size={20}/> Flamboyan Admin</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-gray-600 hover:bg-gray-100 rounded-md">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`fixed md:sticky top-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col pt-4 h-screen transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="px-6 mb-8 mt-2 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-primary">Flamboyan Admin</h2>
            <p className="text-xs text-gray-500 mt-1">Superadmin Console</p>
          </div>
          <button className="md:hidden text-gray-400 hover:text-gray-600" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 font-medium rounded-xl transition ${
                  isActive 
                    ? "bg-blue-50 text-primary font-semibold" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} /> {link.name}
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition">
            <LogOut size={20} /> Logout
          </Link>
        </div>

        {/* Notification Pop-up */}
        {showNotif && (
          <div className="absolute top-4 left-[calc(100%+16px)] md:left-full md:ml-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in slide-in-from-left-4 duration-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Pesanan Baru!</p>
                <p className="text-xs text-gray-500 mt-1">Ada {pendingCount} pesanan menunggu konfirmasi.</p>
              </div>
              <button onClick={() => setShowNotif(false)} className="text-gray-300 hover:text-gray-500 ml-auto text-lg leading-none">&times;</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
