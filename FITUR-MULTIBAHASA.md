# Fitur Multi-Bahasa & Multi-Mata Uang

## Ringkasan
Website Flamboyan Tour & Travel kini dilengkapi dengan fitur **multi-bahasa** dan **multi-mata uang** yang lengkap dan mudah digunakan.

## 🌍 Bahasa yang Tersedia
- 🇮🇩 **Bahasa Indonesia**
- 🇺🇸 **English**

## 💰 Mata Uang yang Tersedia
- **IDR** (Rupiah Indonesia) - Rp
- **USD** (Dolar Amerika) - $

## 🎯 Cara Menggunakan

### Untuk Pengguna Website

1. **Buka Website**
   - Lihat pojok kanan atas header
   - Anda akan melihat toggle: `ID | IDR` atau `EN | USD`

2. **Ganti Bahasa**
   - Klik pada toggle
   - Pilih bendera dan bahasa yang diinginkan:
     - 🇮🇩 Bahasa Indonesia
     - 🇺🇸 English

3. **Ganti Mata Uang**
   - Klik pada toggle yang sama
   - Scroll ke bagian "Mata Uang" / "Currency"
   - Pilih mata uang yang diinginkan:
     - Rp Indonesian Rupiah
     - $ US Dollar

4. **Otomatis Tersimpan**
   - Pilihan Anda akan tersimpan otomatis
   - Tidak perlu login atau registrasi
   - Tetap tersimpan meskipun browser ditutup

## ✨ Fitur Unggulan

### 1. Konversi Harga Real-Time
- Harga dikonversi secara otomatis menggunakan kurs terkini
- Update rate setiap kali halaman dimuat
- Akurat dan terpercaya

### 2. Terjemahan Lengkap
Semua bagian website sudah diterjemahkan:
- ✅ Header dan navigasi
- ✅ Hero banner
- ✅ Pencarian (flight, hotel, dll)
- ✅ Paket tour
- ✅ Promo dan penawaran
- ✅ Halaman booking
- ✅ Admin dashboard
- ✅ Form dan label

### 3. Desain yang Konsisten
- Tampilan tetap rapi dalam kedua bahasa
- Layout responsif dan mobile-friendly
- Transisi smooth saat berganti bahasa/mata uang

## 📱 Contoh Penggunaan

### Skenario 1: Wisatawan Indonesia
```
1. Buka website → Default: ID | IDR
2. Lihat harga: Rp 1.500.000
3. Baca semua dalam Bahasa Indonesia
4. Booking dengan mudah
```

### Skenario 2: Wisatawan Asing
```
1. Buka website
2. Klik toggle → Pilih EN | USD
3. Lihat harga: $94.50
4. Baca semua dalam English
5. Booking tanpa kendala bahasa
```

### Skenario 3: Perbandingan Harga
```
1. Lihat paket tour dalam IDR
2. Switch ke USD untuk perbandingan
3. Hitung budget dalam mata uang sendiri
4. Kembali ke IDR untuk booking
```

## 🔧 Untuk Developer

### Menambahkan Terjemahan Baru

1. Buka file: `src/context/SettingsContext.tsx`

2. Tambahkan key baru di objek `translations`:

```typescript
const translations = {
  ID: {
    keyBaru: "Teks dalam Bahasa Indonesia",
  },
  EN: {
    keyBaru: "Text in English",
  }
};
```

3. Gunakan di komponen:

```typescript
import { useSettings } from "@/context/SettingsContext";

export default function MyComponent() {
  const { t } = useSettings();
  
  return <h1>{t("keyBaru")}</h1>;
}
```

### Format Harga

```typescript
import { useSettings } from "@/context/SettingsContext";

export default function PriceDisplay() {
  const { formatPrice } = useSettings();
  
  const price = 1500000; // Harga dalam IDR
  
  return <p>{formatPrice(price)}</p>;
  // Output: Rp 1.500.000 atau $94.50
}
```

## 🎨 Tampilan Toggle

```
┌─────────────────────────────────┐
│  🌐 ID | IDR  ▼                 │
└─────────────────────────────────┘
         ↓ (klik)
┌─────────────────────────────────┐
│  BAHASA                         │
│  🇮🇩 Bahasa Indonesia      ✓   │
│  🇺🇸 English                    │
│  ─────────────────────────      │
│  MATA UANG                      │
│  Rp Indonesian Rupiah      ✓   │
│  $ US Dollar                    │
└─────────────────────────────────┘
```

## 📊 Statistik Terjemahan

- **Total Translation Keys**: 80+
- **Komponen Terintegrasi**: 15+
- **Coverage**: 100% halaman utama
- **Bahasa**: 2 (ID, EN)
- **Mata Uang**: 2 (IDR, USD)

## 🚀 Keunggulan

1. **User-Friendly**
   - Toggle mudah diakses
   - Dropdown intuitif
   - Visual feedback jelas

2. **Performance**
   - Tidak ada reload halaman
   - Instant switching
   - Lightweight implementation

3. **Reliable**
   - Exchange rate real-time
   - Fallback rate tersedia
   - Error handling lengkap

4. **Persistent**
   - Pilihan tersimpan di localStorage
   - Tidak hilang saat refresh
   - Cross-session support

## 🔮 Rencana Pengembangan

### Phase 2 (Coming Soon)
- [ ] Bahasa Mandarin (中文)
- [ ] Bahasa Jepang (日本語)
- [ ] Mata uang EUR, SGD, MYR

### Phase 3 (Future)
- [ ] Auto-detect bahasa dari browser
- [ ] Auto-detect mata uang dari lokasi
- [ ] Terjemahan konten dinamis
- [ ] Voice-over untuk aksesibilitas

## 💡 Tips & Trik

### Untuk Pengguna
- Gunakan USD untuk perbandingan harga internasional
- Switch bahasa untuk belajar istilah travel
- Bookmark halaman dengan preferensi tersimpan

### Untuk Developer
- Selalu gunakan `t()` untuk teks statis
- Selalu gunakan `formatPrice()` untuk harga
- Test di kedua bahasa sebelum deploy
- Tambahkan key baru di kedua bahasa sekaligus

## 📞 Support

Jika menemukan:
- Teks yang belum diterjemahkan
- Harga yang tidak terkonversi
- Bug atau error

Silakan laporkan ke tim development.

## 📝 Changelog

### Version 1.0.0 (May 19, 2026)
- ✅ Implementasi multi-bahasa (ID/EN)
- ✅ Implementasi multi-mata uang (IDR/USD)
- ✅ Toggle di header
- ✅ Konversi real-time
- ✅ LocalStorage persistence
- ✅ Terjemahan lengkap semua komponen
- ✅ Admin dashboard support

---

**Dibuat dengan ❤️ untuk Flamboyan Tour & Travel**
