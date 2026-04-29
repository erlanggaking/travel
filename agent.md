📑 PRODUCT REQUIREMENTS DOCUMENT (PRD)
Project Name: Flamboyan Tour & Travel (OTA Super-App)
Version: 2.1 (Design & Layout Update)
Status: Final Blueprint for Development

1. Executive Summary
Flamboyan Tour & Travel adalah platform Travel Super-App hibrida yang menggabungkan layanan Aggregator (Pesawat, Hotel, Kereta) dan Tour Operator in-house. Fokus utama versi ini adalah replikasi pengalaman pengguna (UX) dan tata letak (UI) Traveloka untuk membangun kepercayaan instan dan kemudahan navigasi bagi pengguna di Indonesia.

2. Tech Stack & Architecture
Frontend: Next.js (App Router), Tailwind CSS.

Backend: Node.js (Next.js API Routes).

Deployment: Vercel (Blueprint Phase) -> VPS (Production).

Payment & Notif: Xendit/Midtrans, Email (Primary), WhatsApp API.

3. UI/UX Design Language (Traveloka Style)
Bagian ini menjadi panduan utama untuk tim desain dan frontend:

Color Palette: Dominasi Primary Blue (Hex: #0194F3) untuk tombol utama, Header, dan ikon. Menggunakan latar belakang putih bersih dan abu-abu sangat muda (#F7F9FA) untuk pemisah antar seksi.

Typography: Menggunakan sans-serif yang bersih (seperti Google Sans atau Inter) dengan hierarki visual yang jelas.

Component Styling: Card dengan border-radius lembut (8-12px) dan box-shadow tipis untuk memberikan kesan kedalaman (depth).

Interaction: Penggunaan Skeleton Loading saat memuat data dan Progress Stepper (Langkah 1, 2, 3) yang jelas di bagian atas saat proses booking.

4. Frontend Features (B2C User Portal)
4.1. Homepage Layout (Traveloka Clone)

Header: Logo Flamboyan di kiri, bar pencarian statis, tombol Login/Register, serta dropdown Bahasa & Mata Uang.

Hero Image Slider: Banner promosi lebar dengan aspek rasio yang konsisten untuk desktop dan mobile.

Main Product Grid (Icon Grid): Susunan ikon 4x2 atau sesuai jumlah produk (Pesawat, Hotel, Kereta, Bus, Airport Transfer, Car Rental, Visa, Tour Packages). Ikon harus memiliki gaya visual yang seragam (flat/3D minimalis).

Dynamic Search Box: Terletak tepat di bawah ikon grid. Menggunakan sistem tabbing yang mengubah kolom input secara instan tanpa reload halaman.

4.2. Search Results Page (SRP) Layout

Flight/Train Results: Card horizontal yang menampilkan Logo Maskapai/Kereta di kiri, detail waktu di tengah, dan harga berwarna oranye tebal di kanan dengan tombol "Pilih".

Hotel Results: Layout list (mobile) atau grid (desktop) dengan foto hotel di kiri/atas, rating bintang, lokasi, dan harga per malam yang menonjol.

Floating Filter: Panel filter (Samping di desktop, Floating Button di mobile) untuk menyaring harga, fasilitas, dan waktu.

4.3. Booking & Checkout Flow

Stepper Navigation: Menunjukkan tahapan: "1. Pesan" -> "2. Bayar" -> "3. Selesai".

Booking Form: Layout bersih dengan pengelompokan "Data Pemesan" dan "Data Penumpang".

Quick Pick (Smart Fill): Ikon profil kecil di sudut form yang menampilkan daftar nama tersimpan saat di-klik.

Order Summary Sidebar: Panel yang selalu menempel (sticky) saat scroll, menampilkan rincian biaya secara transparan.

Cross-Selling Section: Muncul tepat sebelum tombol pembayaran sebagai bagian dari aliran navigasi (bukan pop-up yang mengganggu).

5. Produk & Inventori (Hybrid Model)
Aggregator (Dummy 20 Data): Data pesawat, hotel, dan kereta yang disajikan melalui Mock API.

In-House Packages:

Fixed Package: Halaman detail produk dengan galeri foto, tab Itinerary, tab Review, dan formulir pemilihan tanggal.

Custom Request: Formulir interaktif untuk permintaan paket tur pribadi.

Auto-Claim Promo: Kolom input kode promo yang juga menampilkan daftar kupon yang tersedia untuk langsung di-klik.

6. Admin Dashboard (Superadmin)
Symmetry UI: Layout admin yang bersih menggunakan sidebar navigasi di kiri.

Inventory Manager: Modul untuk upload konten, mengatur foto destinasi, mengubah harga paket in-house, dan mengatur markup harga API.

Order & CMS Management: Memantau status transaksi, mengelola banner homepage, artikel blog, dan membalas Custom Request dari user.

7. Logic & Edge Cases
Direct Checkout: Setiap produk diproses per transaksi (tidak ada keranjang belanja multi-produk).

Multi-Language/Currency: Konversi harga dan teks dilakukan di sisi client berdasarkan toggle yang dipilih.

Customer Service: Tombol melayang (Floating Action Button) WhatsApp di pojok kanan bawah setiap halaman.

Refund/Reschedule: Diarahkan manual ke CS dengan menyertakan ID Pesanan.