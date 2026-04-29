"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ID" | "EN";
type Currency = "IDR" | "USD";

interface SettingsContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  formatPrice: (price: number) => string;
  t: (key: any) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations = {
  ID: {
    searchPlaceholder: "Cari penerbangan, hotel, dll...",
    loginRegister: "Masuk / Daftar",
    popularPackages: "Paket Tour Terpopuler",
    startingFrom: "Mulai Dari",
    searchFlights: "Cari Penerbangan",
    searchHotels: "Cari Hotel",
    searchTrains: "Cari Kereta Api",
    searchBus: "Cari Bus & Travel",
    searchCar: "Cari Rental Mobil",
    searchActivity: "Cari Atraksi",
    searchVisa: "Cari Visa",
    searchTours: "Cari Paket Tour",
    limitedOffer: "PENAWARAN TERBATAS",
    specialPromo: "Promo Spesial Untukmu",
    specialPromoSub: "Dapatkan penawaran terbaik sebelum kehabisan!",
    viewAll: "Lihat Semua",
    days: "Hari",
    nights: "Malam",
    bestSeller: "PALING LARIS",
    topChoice: "PILIHAN UTAMA",
    luxury: "MEWAH",
    recommended: "REKOMENDASI",
    flight: "Pesawat",
    hotel: "Hotel",
    train: "Kereta Api",
    bus: "Bus & Travel",
    car: "Rental Mobil",
    activity: "Atraksi",
    visa: "Visa",
    tours: "Paket Tour",
    bookYourFlight: "Pesan Penerbangan Anda",
    oneWay: "Sekali Jalan",
    roundTrip: "Pulang-Pergi",
    multiCity: "Banyak Kota",
    from: "DARI",
    to: "KE",
    departure: "PERGI",
    return: "PULANG",
    adult: "DEWASA",
    child: "ANAK",
    infant: "BAYI",
    yearsOld: "Thn",
    under12: "Di bawah 12 Thn",
    under2: "Di bawah 2 Thn",
    showMore: "Tampilkan lebih banyak opsi",
    search: "Cari",
    filter: "Filter",
    price: "Harga",
    airline: "Maskapai",
    canRefund: "Bisa Refund",
    direct: "Langsung",
    transit: "Transit",
    changeSearch: "Ubah Pencarian",
    choose: "Pilih",
    passenger: "Penumpang",
    economy: "Ekonomi",
    business: "Bisnis",
    firstClass: "First Class",
    flightNumber: "PENERBANGAN",
    addFlight: "TAMBAH PENERBANGAN",
    preferredAirline: "MASKAPAI YANG DIINGINKAN",
    class: "KELAS",
    all: "Semua",
    placeholderMin3: "Mohon ketik minimal 3 hur",
    hotelSearchLabel: "Kota, tujuan, atau nama hotel",
    starRating: "Rating Bintang",
    pricePerNight: "Harga Per Malam",
    room: "Kamar",
    guest: "Tamu",
    selectRoom: "Pilih Kamar",
    perRoomPerNight: "/ kamar / malam",
    yourBooking: "Pemesanan Anda",
    contactDetails: "Detail Pemesan",
    fullName: "Nama Lengkap",
    asPerID: "Sesuai KTP/Paspor",
    passengerDetails: "Detail Penumpang / Tamu",
    title: "Titel",
    mr: "Tuan (Mr.)",
    mrs: "Nyonya (Mrs.)",
    ms: "Nona (Ms.)",
    sameAsContact: "Sama dengan pemesan",
    travelInsurance: "Asuransi Perjalanan",
    insuranceSub: "Lindungi perjalanan Anda dari keterlambatan atau pembatalan tak terduga.",
    addInsurance: "Tambahkan seharga Rp 45.000 / pax",
    continueToPayment: "Lanjutkan ke Pembayaran",
    payment: "Pembayaran",
    paymentMethod: "Metode Pembayaran",
    creditDebitCard: "Kartu Kredit / Debit",
    bankTransfer: "Transfer Bank (Virtual Account)",
    eWallet: "E-Wallet",
    back: "Kembali",
    payNow: "Bayar Sekarang",
    bookingSuccess: "Pemesanan Berhasil!",
    thankYouBooking: "Terima kasih atas pemesanan Anda. E-ticket telah dikirimkan ke email Anda:",
    backToHome: "Ke Beranda",
    checkDashboard: "Cek Dashboard",
    stepBook: "Pesan",
    stepPay: "Bayar",
    stepDone: "Selesai",
    bookingSummary: "Detail Pesanan",
    adultTicket: "Tiket Dewasa (1x)",
    taxFees: "Pajak & Biaya",
    totalPrice: "Total Harga",
    insuranceSummary: "Asuransi P. P.",
    selectDepartureDate: "Pilih Tanggal Pergi",
    selectReturnDate: "Pilih Tanggal Pulang",
    indicativePrice: "Harga Indikatif",
    holiday: "Hari Libur",
    stayDate: "Tanggal Menginap",
    confirm: "Konfirmasi",
    cancel: "Batal",
    checkIn: "Check-In",
    checkOut: "Check-Out",
    guestsRooms: "Tamu dan Kamar",
    done: "Selesai",
  },
  EN: {
    searchPlaceholder: "Search flights, hotels, etc...",
    loginRegister: "Login / Register",
    popularPackages: "Most Popular Tour Packages",
    startingFrom: "Starting From",
    searchFlights: "Search Flights",
    searchHotels: "Search Hotels",
    searchTrains: "Search Trains",
    searchBus: "Search Bus & Travel",
    searchCar: "Search Car Rental",
    searchActivity: "Search Attractions",
    searchVisa: "Search Visa",
    searchTours: "Search Tour Packages",
    limitedOffer: "LIMITED OFFER",
    specialPromo: "Special Promo for You",
    specialPromoSub: "Get the best deals before they're gone!",
    viewAll: "View All",
    days: "Days",
    nights: "Nights",
    bestSeller: "BEST SELLER",
    topChoice: "TOP CHOICE",
    luxury: "LUXURY",
    recommended: "RECOMMENDED",
    flight: "Flights",
    hotel: "Hotels",
    train: "Trains",
    bus: "Bus & Travel",
    car: "Car Rental",
    activity: "Attractions",
    visa: "Visa",
    tours: "Tour Packages",
    bookYourFlight: "Book Your Flight",
    oneWay: "One Way",
    roundTrip: "Round Trip",
    multiCity: "Multi City",
    from: "FROM",
    to: "TO",
    departure: "DEPARTURE",
    return: "RETURN",
    adult: "ADULT",
    child: "CHILD",
    infant: "INFANT",
    yearsOld: "yrs",
    under12: "Under 12 yrs",
    under2: "Under 2 yrs",
    showMore: "Show more options",
    search: "Search",
    filter: "Filter",
    price: "Price",
    airline: "Airline",
    canRefund: "Refundable",
    direct: "Direct",
    transit: "Transit",
    changeSearch: "Change Search",
    choose: "Select",
    passenger: "Passenger",
    economy: "Economy",
    business: "Business",
    firstClass: "First Class",
    flightNumber: "FLIGHT",
    addFlight: "ADD FLIGHT",
    preferredAirline: "PREFERRED AIRLINE",
    class: "CLASS",
    all: "All",
    placeholderMin3: "Please type at least 3 char",
    hotelSearchLabel: "City, destination, or hotel name",
    starRating: "Star Rating",
    pricePerNight: "Price Per Night",
    room: "Room",
    guest: "Guest",
    selectRoom: "Select Room",
    perRoomPerNight: "/ room / night",
    yourBooking: "Your Booking",
    contactDetails: "Contact Details",
    fullName: "Full Name",
    asPerID: "As per ID/Passport",
    passengerDetails: "Passenger / Guest Details",
    title: "Title",
    mr: "Mr.",
    mrs: "Mrs.",
    ms: "Ms.",
    sameAsContact: "Same as contact person",
    travelInsurance: "Travel Insurance",
    insuranceSub: "Protect your trip from unexpected delays or cancellations.",
    addInsurance: "Add for USD $3.00 / pax",
    continueToPayment: "Continue to Payment",
    payment: "Payment",
    paymentMethod: "Payment Method",
    creditDebitCard: "Credit / Debit Card",
    bankTransfer: "Bank Transfer (Virtual Account)",
    eWallet: "E-Wallet",
    back: "Back",
    payNow: "Pay Now",
    bookingSuccess: "Booking Successful!",
    thankYouBooking: "Thank you for your booking. E-ticket has been sent to your email:",
    backToHome: "Back to Home",
    checkDashboard: "Check Dashboard",
    stepBook: "Book",
    stepPay: "Pay",
    stepDone: "Done",
    bookingSummary: "Booking Summary",
    adultTicket: "Adult Ticket (1x)",
    taxFees: "Tax & Fees",
    totalPrice: "Total Price",
    insuranceSummary: "Travel Insurance",
    selectDepartureDate: "Select Departure Date",
    selectReturnDate: "Select Return Date",
    indicativePrice: "Indicative Price",
    holiday: "Holiday",
    stayDate: "Stay Date",
    confirm: "Confirm",
    cancel: "Cancel",
    checkIn: "Check-In",
    checkOut: "Check-Out",
    guestsRooms: "Guests and Rooms",
    done: "Done",
  }
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ID");
  const [currency, setCurrency] = useState<Currency>("IDR");
  const [exchangeRate, setExchangeRate] = useState(0.000063); // Default fallback

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    const savedCurr = localStorage.getItem("currency") as Currency;
    if (savedLang) setLanguage(savedLang);
    if (savedCurr) setCurrency(savedCurr);

    // Fetch real-time exchange rate
    fetch("https://open.er-api.com/v6/latest/IDR")
      .then(res => res.json())
      .then(data => {
        if (data.rates && data.rates.USD) {
          setExchangeRate(data.rates.USD);
          console.log("Real-time Rate IDR to USD:", data.rates.USD);
        }
      })
      .catch(err => console.error("Failed to fetch exchange rate:", err));
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem("currency", curr);
  };

  const formatPrice = (price: number) => {
    if (currency === "USD") {
      const usdPrice = price * exchangeRate;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(usdPrice);
    } else {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(price).replace(/,00$/, "");
    }
  };

  const t = (key: keyof typeof translations.ID) => {
    return translations[language][key] || translations.ID[key] || key;
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        language, 
        currency, 
        setLanguage: handleSetLanguage, 
        setCurrency: handleSetCurrency,
        formatPrice,
        t
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
