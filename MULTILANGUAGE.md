# Multi-Language & Multi-Currency Feature

## Overview
Website Flamboyan Tour & Travel sekarang mendukung **multi-bahasa** (Bahasa Indonesia & English) dan **multi-mata uang** (IDR & USD) secara penuh.

## Fitur Utama

### 1. Toggle Bahasa & Mata Uang
- **Lokasi**: Header (pojok kanan atas)
- **Format**: `ID | IDR` atau `EN | USD`
- **Cara Kerja**: Klik pada toggle untuk membuka dropdown yang menampilkan pilihan bahasa dan mata uang

### 2. Bahasa yang Didukung
- 🇮🇩 **Bahasa Indonesia (ID)**
- 🇺🇸 **English (EN)**

### 3. Mata Uang yang Didukung
- **IDR (Indonesian Rupiah)** - Rp
- **USD (US Dollar)** - $

### 4. Konversi Mata Uang Real-Time
- Sistem menggunakan API exchange rate real-time dari `open.er-api.com`
- Rate diperbarui setiap kali halaman dimuat
- Fallback rate: 1 IDR = 0.000063 USD (jika API gagal)

## Implementasi Teknis

### Context Provider
File: `/src/context/SettingsContext.tsx`

```typescript
const { language, currency, formatPrice, t } = useSettings();
```

**Fungsi Utama:**
- `language`: Bahasa aktif saat ini ("ID" | "EN")
- `currency`: Mata uang aktif saat ini ("IDR" | "USD")
- `formatPrice(price)`: Format harga sesuai mata uang aktif
- `t(key)`: Translate teks berdasarkan bahasa aktif
- `setLanguage(lang)`: Ubah bahasa
- `setCurrency(curr)`: Ubah mata uang

### Cara Menggunakan di Komponen

#### 1. Import Hook
```typescript
import { useSettings } from "@/context/SettingsContext";
```

#### 2. Gunakan dalam Komponen
```typescript
export default function MyComponent() {
  const { t, formatPrice, language, currency } = useSettings();
  
  return (
    <div>
      <h1>{t("welcomeMessage")}</h1>
      <p>{formatPrice(1500000)}</p>
    </div>
  );
}
```

### Menambahkan Terjemahan Baru

Edit file `/src/context/SettingsContext.tsx`:

```typescript
const translations = {
  ID: {
    // Tambahkan key baru di sini
    myNewKey: "Teks dalam Bahasa Indonesia",
  },
  EN: {
    // Tambahkan key yang sama di sini
    myNewKey: "Text in English",
  }
};
```

## Komponen yang Sudah Mendukung Multi-Language

✅ **Header** - Toggle bahasa & mata uang, search placeholder, login button
✅ **HeroSlider** - Judul dan subtitle hero
✅ **ProductGrid** - Nama produk (Pesawat, Hotel, dll)
✅ **SearchBox** - Semua label, placeholder, dan button
✅ **TourPackages** - Judul section, label harga, durasi
✅ **PromoSection** - Judul promo, subtitle, button
✅ **AdminSidebar** - Menu navigasi admin, notifikasi
✅ **Booking Page** - Form pemesanan, detail penumpang, pembayaran

## Format Harga

### IDR (Indonesian Rupiah)
```
Rp 1.500.000
Rp 450.000
```

### USD (US Dollar)
```
$94.50
$28.35
```

**Catatan**: Konversi otomatis menggunakan exchange rate real-time.

## Persistensi Data

Pilihan bahasa dan mata uang disimpan di **localStorage**:
- Key: `language` → Value: "ID" atau "EN"
- Key: `currency` → Value: "IDR" atau "USD"

Pilihan akan tetap tersimpan meskipun browser ditutup.

## Testing

### Test Manual
1. Buka website
2. Klik toggle `ID | IDR` di header
3. Pilih bahasa English
4. Pilih mata uang USD
5. Verifikasi semua teks berubah ke English
6. Verifikasi semua harga berubah ke USD
7. Refresh halaman → pilihan tetap tersimpan

### Test Konversi Mata Uang
1. Catat harga dalam IDR
2. Switch ke USD
3. Verifikasi konversi sesuai dengan rate yang berlaku
4. Cek console untuk melihat exchange rate yang digunakan

## Troubleshooting

### Teks Tidak Berubah
- Pastikan komponen menggunakan `t(key)` untuk semua teks
- Pastikan key terjemahan ada di kedua bahasa (ID & EN)
- Periksa console untuk error

### Harga Tidak Berubah
- Pastikan menggunakan `formatPrice(price)` bukan hardcode
- Pastikan harga dalam format number, bukan string
- Periksa apakah API exchange rate berhasil (lihat console)

### Pilihan Tidak Tersimpan
- Periksa localStorage browser
- Pastikan browser mendukung localStorage
- Clear cache dan coba lagi

## Future Enhancements

Fitur yang bisa ditambahkan di masa depan:
- [ ] Tambah bahasa lain (Mandarin, Jepang, dll)
- [ ] Tambah mata uang lain (EUR, SGD, MYR, dll)
- [ ] Auto-detect bahasa berdasarkan browser
- [ ] Auto-detect mata uang berdasarkan lokasi
- [ ] Terjemahan konten dinamis dari database
- [ ] RTL support untuk bahasa Arab

## API Reference

### useSettings Hook

```typescript
interface SettingsContextType {
  language: "ID" | "EN";
  currency: "IDR" | "USD";
  setLanguage: (lang: "ID" | "EN") => void;
  setCurrency: (curr: "IDR" | "USD") => void;
  formatPrice: (price: number) => string;
  t: (key: string) => string;
}
```

### Translation Keys

Lihat file `/src/context/SettingsContext.tsx` untuk daftar lengkap translation keys yang tersedia.

## Kontributor

Untuk menambahkan terjemahan baru atau memperbaiki terjemahan yang ada:
1. Edit file `/src/context/SettingsContext.tsx`
2. Tambahkan key di kedua objek (ID & EN)
3. Test perubahan
4. Commit dengan pesan yang jelas

---

**Last Updated**: May 19, 2026
**Version**: 1.0.0
