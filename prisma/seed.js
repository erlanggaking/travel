const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin
  const admin = await prisma.user.create({
    data: { email: "admin@flamboyan.com", name: "Super Admin", role: "ADMIN", phone: "+6281000000000", location: "Jakarta" },
  });

  // Seed Customers
  const customers = [];
  const custData = [
    { email: "budi.santoso@example.com", name: "Budi Santoso", phone: "+6281234567890", location: "Jakarta, Indonesia" },
    { email: "siti.aminah@gmail.com", name: "Siti Aminah", phone: "+6281399876543", location: "Surabaya, Indonesia" },
    { email: "agus.praptono@yahoo.com", name: "Agus Praptono", phone: "+6285611223344", location: "Bandung, Indonesia" },
    { email: "dian.sastro@agency.co.id", name: "Dian Sastro", phone: "+6281122334455", location: "Bali, Indonesia" },
    { email: "eko.purwanto@mail.com", name: "Eko Purwanto", phone: "+6287766554433", location: "Yogyakarta, Indonesia" },
    { email: "rina.wati@outlook.com", name: "Rina Wati", phone: "+6281998877665", location: "Semarang, Indonesia" },
    { email: "tommy.lim@gmail.com", name: "Tommy Lim", phone: "+6281223344556", location: "Medan, Indonesia" },
    { email: "maya.dewi@mail.com", name: "Maya Dewi", phone: "+6281334455667", location: "Makassar, Indonesia" },
  ];
  for (const c of custData) {
    customers.push(await prisma.user.create({ data: { ...c, role: "CUSTOMER" } }));
  }

  // Seed Tours
  const tours = [];
  const tourData = [
    { title: "Wonderful Japan: Tokyo & Mt. Fuji", location: "Japan", duration: "7 Days 6 Nights", price: 18500000, rating: 4.9, imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop", tag: "BEST SELLER", quota: 12 },
    { title: "Eksotisme Labuan Bajo Premium", location: "Indonesia", duration: "3 Days 2 Nights", price: 4200000, rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=600&h=400&fit=crop", tag: "TOP CHOICE", quota: 5 },
    { title: "Swiss Alps Adventure & Lucerne", location: "Switzerland", duration: "10 Days 9 Nights", price: 32000000, rating: 5.0, imageUrl: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=600&h=400&fit=crop", tag: "LUXURY", quota: 8 },
    { title: "Historical Turkey: Istanbul & Cappadocia", location: "Turkey", duration: "8 Days 7 Nights", price: 15900000, rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop", tag: "RECOMMENDED", quota: 0 },
    { title: "Korea Selatan: Seoul & Jeju Island", location: "South Korea", duration: "6 Days 5 Nights", price: 12500000, rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&h=400&fit=crop", tag: "BEST SELLER", quota: 15 },
  ];
  for (const t of tourData) {
    tours.push(await prisma.tourPackage.create({ data: t }));
  }

  // Seed Hotels
  const hotels = [];
  const hotelData = [
    { name: "The Ritz-Carlton Bali", location: "Bali, Indonesia", rating: 4.9, starRating: 5, pricePerNight: 3500000, imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", facilities: "WiFi,Pool,Spa,Gym,Restaurant,Parking", description: "Luxury beachfront resort" },
    { name: "Aston Priority Simatupang", location: "Jakarta, Indonesia", rating: 4.2, starRating: 4, pricePerNight: 850000, imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop", facilities: "WiFi,Pool,Gym,Restaurant,Parking", description: "Modern city hotel" },
    { name: "Plataran Borobudur", location: "Magelang, Indonesia", rating: 4.7, starRating: 5, pricePerNight: 2800000, imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop", facilities: "WiFi,Pool,Spa,Restaurant", description: "Heritage luxury resort" },
    { name: "Fave Hotel Braga", location: "Bandung, Indonesia", rating: 3.8, starRating: 3, pricePerNight: 450000, imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop", facilities: "WiFi,Restaurant,Parking", description: "Budget-friendly city hotel" },
    { name: "The Apurva Kempinski", location: "Bali, Indonesia", rating: 4.9, starRating: 5, pricePerNight: 5200000, imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop", facilities: "WiFi,Pool,Spa,Gym,Restaurant,Parking", description: "Ultra-luxury cliffside resort" },
  ];
  for (const h of hotelData) {
    hotels.push(await prisma.hotel.create({ data: h }));
  }

  // Seed Flights
  const flights = [];
  const flightData = [
    { airline: "Garuda Indonesia", flightNumber: "GA-401", departureTime: new Date("2026-08-15T10:00:00"), arrivalTime: new Date("2026-08-15T12:50:00"), origin: "CGK", destination: "DPS", price: 1450000, duration: "2h 50m", logoUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/Garuda_Indonesia_Logo.svg", class: "Economy", isRefundable: true },
    { airline: "Lion Air", flightNumber: "JT-512", departureTime: new Date("2026-08-15T06:30:00"), arrivalTime: new Date("2026-08-15T09:10:00"), origin: "CGK", destination: "DPS", price: 850000, duration: "2h 40m", logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/8a/Lion_Air_Logo.svg", class: "Economy", isRefundable: false },
    { airline: "Batik Air", flightNumber: "ID-6571", departureTime: new Date("2026-08-15T14:15:00"), arrivalTime: new Date("2026-08-15T17:00:00"), origin: "CGK", destination: "DPS", price: 1200000, duration: "2h 45m", logoUrl: "https://upload.wikimedia.org/wikipedia/en/3/3e/Batik_Air_logo.svg", class: "Economy", isRefundable: true },
    { airline: "Citilink", flightNumber: "QG-811", departureTime: new Date("2026-08-16T08:00:00"), arrivalTime: new Date("2026-08-16T10:40:00"), origin: "SUB", destination: "DPS", price: 650000, duration: "1h 40m", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Citilink_logo.svg", class: "Economy", isRefundable: false },
    { airline: "Garuda Indonesia", flightNumber: "GA-302", departureTime: new Date("2026-08-17T09:00:00"), arrivalTime: new Date("2026-08-17T11:30:00"), origin: "CGK", destination: "SUB", price: 1100000, duration: "1h 30m", logoUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/Garuda_Indonesia_Logo.svg", class: "Business", isRefundable: true },
  ];
  for (const f of flightData) {
    flights.push(await prisma.flight.create({ data: f }));
  }

  // Seed Bookings
  const statuses = ["PENDING", "PAID", "PAID", "PAID", "CANCELLED", "REFUNDED"];
  const bookingData = [
    { type: "FLIGHT", customerName: "Budi Santoso", customerEmail: "budi.santoso@example.com", customerPhone: "+6281234567890", productName: "GA-401 CGK→DPS", totalPrice: 1450000, userId: customers[0].id, flightId: flights[0].id, status: "PAID" },
    { type: "HOTEL", customerName: "Siti Aminah", customerEmail: "siti.aminah@gmail.com", customerPhone: "+6281399876543", productName: "The Ritz-Carlton Bali (3 nights)", totalPrice: 10500000, userId: customers[1].id, hotelId: hotels[0].id, status: "PENDING" },
    { type: "TOUR", customerName: "Agus Praptono", customerEmail: "agus.praptono@yahoo.com", customerPhone: "+6285611223344", productName: "Wonderful Japan: Tokyo & Mt. Fuji", totalPrice: 18500000, userId: customers[2].id, tourId: tours[0].id, status: "PAID" },
    { type: "FLIGHT", customerName: "Dian Sastro", customerEmail: "dian.sastro@agency.co.id", customerPhone: "+6281122334455", productName: "JT-512 CGK→DPS", totalPrice: 850000, userId: customers[3].id, flightId: flights[1].id, status: "REFUNDED" },
    { type: "TOUR", customerName: "Eko Purwanto", customerEmail: "eko.purwanto@mail.com", customerPhone: "+6287766554433", productName: "Swiss Alps Adventure & Lucerne", totalPrice: 32000000, userId: customers[4].id, tourId: tours[2].id, status: "PAID" },
    { type: "HOTEL", customerName: "Rina Wati", customerEmail: "rina.wati@outlook.com", customerPhone: "+6281998877665", productName: "Plataran Borobudur (2 nights)", totalPrice: 5600000, userId: customers[5].id, hotelId: hotels[2].id, status: "PAID" },
    { type: "FLIGHT", customerName: "Tommy Lim", customerEmail: "tommy.lim@gmail.com", customerPhone: "+6281223344556", productName: "QG-811 SUB→DPS", totalPrice: 650000, userId: customers[6].id, flightId: flights[3].id, status: "CANCELLED" },
    { type: "TOUR", customerName: "Maya Dewi", customerEmail: "maya.dewi@mail.com", customerPhone: "+6281334455667", productName: "Korea Selatan: Seoul & Jeju Island", totalPrice: 12500000, userId: customers[7].id, tourId: tours[4].id, status: "PENDING" },
    { type: "HOTEL", customerName: "Budi Santoso", customerEmail: "budi.santoso@example.com", customerPhone: "+6281234567890", productName: "Aston Priority Simatupang (1 night)", totalPrice: 850000, userId: customers[0].id, hotelId: hotels[1].id, status: "PAID" },
    { type: "FLIGHT", customerName: "Agus Praptono", customerEmail: "agus.praptono@yahoo.com", customerPhone: "+6285611223344", productName: "GA-302 CGK→SUB", totalPrice: 1100000, userId: customers[2].id, flightId: flights[4].id, status: "PAID" },
    { type: "TOUR", customerName: "Siti Aminah", customerEmail: "siti.aminah@gmail.com", customerPhone: "+6281399876543", productName: "Eksotisme Labuan Bajo Premium", totalPrice: 4200000, userId: customers[1].id, tourId: tours[1].id, status: "PAID" },
    { type: "HOTEL", customerName: "Eko Purwanto", customerEmail: "eko.purwanto@mail.com", customerPhone: "+6287766554433", productName: "The Apurva Kempinski (2 nights)", totalPrice: 10400000, userId: customers[4].id, hotelId: hotels[4].id, status: "PENDING" },
    { type: "FLIGHT", customerName: "Maya Dewi", customerEmail: "maya.dewi@mail.com", customerPhone: "+6281334455667", productName: "Batik Air ID-6571 CGK→DPS", totalPrice: 1200000, userId: customers[7].id, flightId: flights[2].id, status: "PAID" },
    { type: "HOTEL", customerName: "Tommy Lim", customerEmail: "tommy.lim@gmail.com", customerPhone: "+6281223344556", productName: "Fave Hotel Braga (2 nights)", totalPrice: 900000, userId: customers[6].id, hotelId: hotels[3].id, status: "PAID" },
    { type: "TOUR", customerName: "Rina Wati", customerEmail: "rina.wati@outlook.com", customerPhone: "+6281998877665", productName: "Historical Turkey", totalPrice: 15900000, userId: customers[5].id, tourId: tours[3].id, status: "REFUNDED" },
  ];
  for (const b of bookingData) {
    await prisma.booking.create({ data: b });
  }

  // Seed Promos
  const promoData = [
    { title: "Flash Sale!", subtitle: "Diskon hingga 50% untuk penerbangan domestik", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=300&fit=crop", color: "#FF5E1F", link: "/search/flights", order: 1, validUntil: new Date("2026-12-31") },
    { title: "Hotel Hemat", subtitle: "Cashback 20% untuk hotel bintang 4 & 5", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=300&fit=crop", color: "#0194F3", link: "/search/hotels", order: 2, validUntil: new Date("2026-09-30") },
    { title: "Tour Spesial", subtitle: "Paket tour Jepang mulai Rp 15jt", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=300&fit=crop", color: "#00b18f", link: "/search/tours", order: 3, validUntil: new Date("2026-08-31") },
  ];
  for (const p of promoData) {
    await prisma.promo.create({ data: p });
  }

  // Seed Articles
  await prisma.article.createMany({
    data: [
      { title: "5 Destinasi Wisata Terbaik di Bali", content: "Bali memiliki banyak destinasi wisata menakjubkan...", excerpt: "Temukan 5 tempat terbaik yang wajib dikunjungi di Bali", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop", status: "PUBLISHED", authorId: admin.id },
      { title: "Tips Hemat Berlibur ke Luar Negeri", content: "Berlibur ke luar negeri tidak harus mahal...", excerpt: "Panduan lengkap berlibur hemat ke luar negeri", imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop", status: "PUBLISHED", authorId: admin.id },
      { title: "Review Hotel Bintang 5 di Jakarta", content: "Jakarta memiliki berbagai pilihan hotel bintang 5...", excerpt: "Ulasan lengkap hotel-hotel mewah di ibu kota", imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop", status: "DRAFT", authorId: admin.id },
    ],
  });

  // Seed Banners
  await prisma.banner.createMany({
    data: [
      { title: "Promo Liburan Impian", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=400&fit=crop", link: "/search/tours", order: 1 },
      { title: "Diskon Penerbangan", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&h=400&fit=crop", link: "/search/flights", order: 2 },
      { title: "Hotel Terbaik", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=400&fit=crop", link: "/search/hotels", order: 3 },
    ],
  });

  // Seed Settings
  await prisma.setting.createMany({
    data: [
      { key: "platformName", value: "Flamboyan Tour & Travel" },
      { key: "csWhatsapp", value: "+6281234567890" },
      { key: "markupFlight", value: "5.5" },
      { key: "markupHotel", value: "10" },
      { key: "markupTour", value: "8" },
      { key: "defaultLanguage", value: "ID" },
      { key: "defaultCurrency", value: "IDR" },
      { key: "emailNotifications", value: "true" },
    ],
  });

  // Seed Expenses
  await prisma.expense.createMany({
    data: [
      { title: "Sewa Kantor Bulan April", amount: 15000000, category: "OPERATIONAL", date: new Date("2026-04-01") },
      { title: "Google Ads Campaign", amount: 5000000, category: "MARKETING", date: new Date("2026-04-05") },
      { title: "Gaji Staff (April)", amount: 25000000, category: "SALARY", date: new Date("2026-04-25") },
      { title: "Server Hosting", amount: 2500000, category: "OPERATIONAL", date: new Date("2026-04-01") },
      { title: "Instagram Promotion", amount: 3000000, category: "MARKETING", date: new Date("2026-04-15") },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
