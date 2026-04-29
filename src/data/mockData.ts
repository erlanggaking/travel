import { faker } from "@faker-js/faker";

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  price: number;
  duration: string;
  logoUrl: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  imageUrl: string;
  facilities: string[];
}

export const getMockFlights = (count = 20): Flight[] => {
  const airlines = ["Garuda Indonesia", "Lion Air", "Batik Air", "Citilink", "AirAsia", "Super Air Jet"];

  return Array.from({ length: count }).map(() => {
    const depDate = faker.date.soon();
    const arrDate = new Date(depDate.getTime() + faker.number.int({ min: 60, max: 300 }) * 60000);
    
    return {
      id: faker.string.uuid(),
      airline: faker.helpers.arrayElement(airlines),
      flightNumber: faker.airline.flightNumber({ length: { min: 2, max: 4 } }),
      departureTime: depDate.toISOString(),
      arrivalTime: arrDate.toISOString(),
      origin: faker.airline.airport().iataCode,
      destination: faker.airline.airport().iataCode,
      price: faker.number.int({ min: 500000, max: 3000000 }),
      duration: `${Math.floor((arrDate.getTime() - depDate.getTime()) / 3600000)}j ${Math.floor(((arrDate.getTime() - depDate.getTime()) % 3600000) / 60000)}m`,
      logoUrl: faker.image.urlLoremFlickr({ category: "airline,logo", width: 100, height: 100 }),
    };
  });
};

export const getMockHotels = (count = 20): Hotel[] => {
  const possibleFacilities = ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking"];

  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: `${faker.company.name()} Hotel`,
    location: faker.location.city(),
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    reviewsCount: faker.number.int({ min: 50, max: 2000 }),
    pricePerNight: faker.number.int({ min: 300000, max: 2500000 }),
    imageUrl: faker.image.urlLoremFlickr({ category: "hotel,room", width: 400, height: 300 }),
    facilities: faker.helpers.arrayElements(possibleFacilities, { min: 2, max: 5 }),
  }));
};
export interface TourPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  imageUrl: string;
  tag: string;
  quota: number;
}

export const getMockTourPackages = (): TourPackage[] => [
  {
    id: "1",
    title: "Wonderful Japan: Tokyo & Mt. Fuji",
    location: "Japan",
    duration: "7 Days 6 Nights",
    price: 18500000,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
    tag: "BEST SELLER",
    quota: 12,
  },
  {
    id: "2",
    title: "Eksotisme Labuan Bajo Premium",
    location: "Indonesia",
    duration: "3 Days 2 Nights",
    price: 4200000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=600&h=400&fit=crop",
    tag: "TOP CHOICE",
    quota: 5,
  },
  {
    id: "3",
    title: "Swiss Alps Adventure & Lucerne",
    location: "Switzerland",
    duration: "10 Days 9 Nights",
    price: 32000000,
    rating: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=600&h=400&fit=crop",
    tag: "LUXURY",
    quota: 8,
  },
  {
    id: "4",
    title: "Historical Turkey: Istanbul & Cappadocia",
    location: "Turkey",
    duration: "8 Days 7 Nights",
    price: 15900000,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop",
    tag: "RECOMMENDED",
    quota: 0,
  },
];
