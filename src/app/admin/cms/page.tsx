"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, FileText, Plus, Trash2, Edit2, X, Save, Loader2, Eye, EyeOff, Bold, Italic, List, Link2, Heading } from "lucide-react";

export default function CMSPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerModal, setBannerModal] = useState(false);
  const [articleModal, setArticleModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [bannerForm, setBannerForm] = useState({ title: "", imageUrl: "", link: "", isActive: true, order: 0 });
  const [articleForm, setArticleForm] = useState({ title: "", content: "", excerpt: "", imageUrl: "", status: "DRAFT" });

  const fetchAll = async () => {
    setLoading(true);
    const [b, a] = await Promise.all([fetch("/api/banners").then(r => r.json()), fetch("/api/articles").then(r => r.json())]);
    setBanners(b); setArticles(a); setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // Banner CRUD
  const openBannerModal = (item?: any) => { setEditItem(item || null); setBannerForm(item ? { ...item } : { title: "", imageUrl: "", link: "", isActive: true, order: 0 }); setBannerModal(true); };
  const saveBanner = async () => {
    const url = editItem ? `/api/banners/${editItem.id}` : "/api/banners";
    await fetch(url, { method: editItem ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...bannerForm, order: Number(bannerForm.order) }) });
    setBannerModal(false); fetchAll();
  };
  const deleteBanner = async (id: string) => { if (!confirm("Hapus banner?")) return; await fetch(`/api/banners/${id}`, { method: "DELETE" }); fetchAll(); };
  const toggleBanner = async (item: any) => { await fetch(`/api/banners/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !item.isActive }) }); fetchAll(); };

  // Article CRUD
  const openArticleModal = (item?: any) => { setEditItem(item || null); setArticleForm(item ? { title: item.title, content: item.content, excerpt: item.excerpt, imageUrl: item.imageUrl, status: item.status } : { title: "", content: "", excerpt: "", imageUrl: "", status: "DRAFT" }); setArticleModal(true); };
  const saveArticle = async () => {
    const url = editItem ? `/api/articles/${editItem.id}` : "/api/articles";
    await fetch(url, { method: editItem ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(articleForm) });
    setArticleModal(false); fetchAll();
  };
  const deleteArticle = async (id: string) => { if (!confirm("Hapus artikel?")) return; await fetch(`/api/articles/${id}`, { method: "DELETE" }); fetchAll(); };
  const toggleArticleStatus = async (item: any) => {
    const newStatus = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await fetch(`/api/articles/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
    fetchAll();
  };

  // Rich text helpers
  const insertFormat = (tag: string) => {
    const textarea = document.getElementById("article-content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = articleForm.content.substring(start, end);
    let replacement = "";
    if (tag === "bold") replacement = `**${selected || "bold text"}**`;
    else if (tag === "italic") replacement = `*${selected || "italic text"}*`;
    else if (tag === "heading") replacement = `\n## ${selected || "Heading"}\n`;
    else if (tag === "list") replacement = `\n- ${selected || "item"}\n`;
    else if (tag === "link") replacement = `[${selected || "link text"}](url)`;
    const newContent = articleForm.content.substring(0, start) + replacement + articleForm.content.substring(end);
    setArticleForm({ ...articleForm, content: newContent });
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Content Management System</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola banner promosi dan artikel blog.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banners */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-primary rounded-lg flex items-center justify-center"><ImageIcon size={20} /></div>
              <h2 className="text-lg font-bold text-gray-800">Banners ({banners.length})</h2>
            </div>
            <button onClick={() => openBannerModal()} className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#017bc7] transition"><Plus size={16} /> Add</button>
          </div>
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
            {banners.map(b => (
              <div key={b.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <img src={b.imageUrl} alt={b.title} className="w-24 h-14 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{b.title}</p>
                  <p className="text-xs text-gray-500">{b.isActive ? "✅ Active" : "⏸ Inactive"}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleBanner(b)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50">{b.isActive ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
                  <button onClick={() => openBannerModal(b)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50"><Edit2 size={14}/></button>
                  <button onClick={() => deleteBanner(b.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><FileText size={20} /></div>
              <h2 className="text-lg font-bold text-gray-800">Artikel ({articles.length})</h2>
            </div>
            <button onClick={() => openArticleModal()} className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"><Plus size={16} /> Tulis</button>
          </div>
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
            {articles.map(a => (
              <div key={a.id} className="flex items-center justify-between gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.author?.name || "Admin"} • {new Date(a.createdAt).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleArticleStatus(a)} className={`text-[10px] font-bold px-2 py-1 rounded-md cursor-pointer ${a.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>{a.status}</button>
                  <button onClick={() => openArticleModal(a)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50"><Edit2 size={14}/></button>
                  <button onClick={() => deleteArticle(a.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Modal */}
      {bannerModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center"><h3 className="font-bold text-lg">{editItem ? "Edit Banner" : "Add Banner"}</h3><button onClick={() => setBannerModal(false)}><X size={20}/></button></div>
            <div className="p-6 flex flex-col gap-4">
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Title</label><input value={bannerForm.title} onChange={e => setBannerForm({ ...bannerForm, title: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Image URL</label><input value={bannerForm.imageUrl} onChange={e => setBannerForm({ ...bannerForm, imageUrl: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Link</label><input value={bannerForm.link} onChange={e => setBannerForm({ ...bannerForm, link: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              {bannerForm.imageUrl && <img src={bannerForm.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl" />}
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button onClick={() => setBannerModal(false)} className="px-4 py-2 text-sm font-bold text-gray-500 rounded-xl hover:bg-gray-100">Batal</button>
              <button onClick={saveBanner} className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Save size={16}/> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal with Rich Text */}
      {articleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center"><h3 className="font-bold text-lg">{editItem ? "Edit Artikel" : "Tulis Artikel"}</h3><button onClick={() => setArticleModal(false)}><X size={20}/></button></div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Judul</label><input value={articleForm.title} onChange={e => setArticleForm({ ...articleForm, title: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Excerpt</label><input value={articleForm.excerpt} onChange={e => setArticleForm({ ...articleForm, excerpt: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Image URL</label><input value={articleForm.imageUrl} onChange={e => setArticleForm({ ...articleForm, imageUrl: e.target.value })} className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Konten (Markdown)</label>
                <div className="flex gap-1 mb-2 p-1 bg-gray-50 rounded-lg border border-gray-200">
                  <button onClick={() => insertFormat("bold")} className="p-2 hover:bg-white rounded-md transition" title="Bold"><Bold size={16}/></button>
                  <button onClick={() => insertFormat("italic")} className="p-2 hover:bg-white rounded-md transition" title="Italic"><Italic size={16}/></button>
                  <button onClick={() => insertFormat("heading")} className="p-2 hover:bg-white rounded-md transition" title="Heading"><Heading size={16}/></button>
                  <button onClick={() => insertFormat("list")} className="p-2 hover:bg-white rounded-md transition" title="List"><List size={16}/></button>
                  <button onClick={() => insertFormat("link")} className="p-2 hover:bg-white rounded-md transition" title="Link"><Link2 size={16}/></button>
                </div>
                <textarea id="article-content" value={articleForm.content} onChange={e => setArticleForm({ ...articleForm, content: e.target.value })} rows={12}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary font-mono resize-y" placeholder="Tulis konten artikel dengan format Markdown..." />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Status</label>
                <select value={articleForm.status} onChange={e => setArticleForm({ ...articleForm, status: e.target.value })}
                  className="border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary bg-white">
                  <option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button onClick={() => setArticleModal(false)} className="px-4 py-2 text-sm font-bold text-gray-500 rounded-xl hover:bg-gray-100">Batal</button>
              <button onClick={saveArticle} className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Save size={16}/> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
