# Contoh Penggunaan Multi-Language & Multi-Currency

## 📚 Panduan Lengkap untuk Developer

### 1. Setup Dasar

Setiap komponen yang ingin menggunakan fitur multi-language harus mengimport dan menggunakan hook `useSettings`:

```typescript
"use client";

import { useSettings } from "@/context/SettingsContext";

export default function MyComponent() {
  const { t, formatPrice, language, currency } = useSettings();
  
  return (
    <div>
      <h1>{t("welcomeMessage")}</h1>
    </div>
  );
}
```

### 2. Menampilkan Teks Terjemahan

#### ❌ SALAH - Hardcode Text
```typescript
export default function BadExample() {
  return <h1>Selamat Datang</h1>;
}
```

#### ✅ BENAR - Menggunakan Translation
```typescript
export default function GoodExample() {
  const { t } = useSettings();
  return <h1>{t("welcomeMessage")}</h1>;
}
```

### 3. Menampilkan Harga

#### ❌ SALAH - Hardcode Price
```typescript
export default function BadPriceExample() {
  return <p>Rp 1.500.000</p>;
}
```

#### ✅ BENAR - Menggunakan formatPrice
```typescript
export default function GoodPriceExample() {
  const { formatPrice } = useSettings();
  const price = 1500000; // Selalu dalam IDR
  
  return <p>{formatPrice(price)}</p>;
  // Output: Rp 1.500.000 atau $94.50
}
```

### 4. Conditional Rendering Berdasarkan Bahasa

```typescript
export default function ConditionalExample() {
  const { language } = useSettings();
  
  return (
    <div>
      {language === "ID" ? (
        <p>Konten khusus untuk pengguna Indonesia</p>
      ) : (
        <p>Content for international users</p>
      )}
    </div>
  );
}
```

### 5. Menambahkan Translation Key Baru

**Step 1**: Edit `src/context/SettingsContext.tsx`

```typescript
const translations = {
  ID: {
    // ... existing keys
    myNewKey: "Teks Baru dalam Bahasa Indonesia",
    anotherKey: "Teks Lainnya",
  },
  EN: {
    // ... existing keys
    myNewKey: "New Text in English",
    anotherKey: "Another Text",
  }
};
```

**Step 2**: Gunakan di komponen

```typescript
export default function NewFeature() {
  const { t } = useSettings();
  
  return (
    <div>
      <h2>{t("myNewKey")}</h2>
      <p>{t("anotherKey")}</p>
    </div>
  );
}
```

### 6. Contoh Komponen Lengkap

```typescript
"use client";

import { useSettings } from "@/context/SettingsContext";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { t, formatPrice, language } = useSettings();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Nama Produk */}
      <h3 className="text-xl font-bold mb-2">
        {product.name}
      </h3>
      
      {/* Deskripsi */}
      <p className="text-gray-600 mb-4">
        {product.description}
      </p>
      
      {/* Harga */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {t("price")}
        </span>
        <span className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </span>
      </div>
      
      {/* Button */}
      <button className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2">
        <ShoppingCart size={20} />
        {t("addToCart")}
      </button>
      
      {/* Info Tambahan */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        {language === "ID" 
          ? "Gratis ongkir untuk pembelian di atas Rp 100.000"
          : "Free shipping for purchases over $6.30"
        }
      </p>
    </div>
  );
}
```

### 7. Contoh Form dengan Multi-Language

```typescript
"use client";

import { useSettings } from "@/context/SettingsContext";
import { useState } from "react";

export default function BookingForm() {
  const { t, language } = useSettings();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  return (
    <form className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-bold mb-1">
          {t("fullName")}
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          placeholder={language === "ID" ? "Masukkan nama lengkap" : "Enter full name"}
          className="w-full border rounded-lg px-3 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          {t("asPerID")}
        </p>
      </div>
      
      {/* Email */}
      <div>
        <label className="block text-sm font-bold mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder={language === "ID" ? "contoh@email.com" : "example@email.com"}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      
      {/* Phone */}
      <div>
        <label className="block text-sm font-bold mb-1">
          {language === "ID" ? "Nomor Telepon" : "Phone Number"}
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder={language === "ID" ? "+62 812 3456 7890" : "+1 234 567 8900"}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      
      {/* Submit Button */}
      <button 
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg font-bold"
      >
        {t("continueToPayment")}
      </button>
    </form>
  );
}
```

### 8. Contoh List dengan Harga

```typescript
"use client";

import { useSettings } from "@/context/SettingsContext";

interface TourPackage {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
}

export default function TourList({ tours }: { tours: TourPackage[] }) {
  const { t, formatPrice } = useSettings();
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {t("popularPackages")}
      </h2>
      
      {tours.map((tour) => (
        <div key={tour.id} className="border rounded-lg p-4">
          <h3 className="font-bold text-lg">{tour.title}</h3>
          <p className="text-gray-600 text-sm">{tour.location}</p>
          <p className="text-gray-500 text-sm">{tour.duration}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">
                {t("startingFrom")}
              </p>
              <p className="text-xl font-bold text-primary">
                {formatPrice(tour.price)}
              </p>
            </div>
            
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              {t("choose")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 9. Contoh Modal/Dialog

```typescript
"use client";

import { useSettings } from "@/context/SettingsContext";
import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  title,
  message 
}: ConfirmModalProps) {
  const { t } = useSettings();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <p className="text-gray-600 mb-6">{message}</p>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded-lg font-bold"
          >
            {t("cancel")}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-primary text-white py-2 rounded-lg font-bold"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 10. Contoh Notification/Toast

```typescript
"use client";

import { useSettings } from "@/context/SettingsContext";
import { CheckCircle, XCircle } from "lucide-react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  show: boolean;
}

export default function Toast({ type, message, show }: ToastProps) {
  const { t } = useSettings();
  
  if (!show) return null;
  
  return (
    <div className={`fixed top-4 right-4 z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3`}>
      {type === "success" ? (
        <CheckCircle size={24} />
      ) : (
        <XCircle size={24} />
      )}
      <div>
        <p className="font-bold">
          {type === "success" ? t("bookingSuccess") : "Error"}
        </p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
```

## 🎯 Best Practices

### DO ✅
1. Selalu gunakan `t()` untuk semua teks yang terlihat user
2. Selalu gunakan `formatPrice()` untuk semua harga
3. Tambahkan translation key di kedua bahasa (ID & EN) sekaligus
4. Test komponen di kedua bahasa sebelum commit
5. Gunakan conditional rendering untuk konten yang sangat berbeda

### DON'T ❌
1. Jangan hardcode teks dalam bahasa tertentu
2. Jangan hardcode format harga (Rp atau $)
3. Jangan lupa menambahkan key di salah satu bahasa
4. Jangan gunakan string concatenation untuk terjemahan
5. Jangan asumsikan user selalu menggunakan bahasa default

## 🔍 Debugging Tips

### Cek Translation Key
```typescript
const { t } = useSettings();
console.log(t("myKey")); // Jika output = "myKey", berarti key tidak ditemukan
```

### Cek Current Language
```typescript
const { language } = useSettings();
console.log("Current language:", language); // "ID" atau "EN"
```

### Cek Current Currency
```typescript
const { currency } = useSettings();
console.log("Current currency:", currency); // "IDR" atau "USD"
```

### Cek Exchange Rate
```typescript
// Lihat di console browser saat halaman load
// Output: "Real-time Rate IDR to USD: 0.000063"
```

## 📝 Checklist untuk Komponen Baru

- [ ] Import `useSettings` hook
- [ ] Gunakan `t()` untuk semua teks
- [ ] Gunakan `formatPrice()` untuk semua harga
- [ ] Tambahkan translation keys baru jika diperlukan
- [ ] Test di bahasa ID
- [ ] Test di bahasa EN
- [ ] Test dengan mata uang IDR
- [ ] Test dengan mata uang USD
- [ ] Verifikasi responsive design
- [ ] Commit dengan pesan yang jelas

---

**Happy Coding! 🚀**
