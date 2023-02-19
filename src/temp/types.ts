export interface houseSchema {
  _id: string;
  id: string;
  userId: string;
  name: string;
  location: string;
  county: string;
  images: string[];
  rate: {
    price: number;
    duration: string;
    countryCode: string;
  };
  compartments: {
    bedrooms: number;
    totalRooms: string;
    washRooms: number;
    parking: boolean;
    roomNumber: boolean;
    security: boolean;
    WIFI: boolean;
    garbageCollection: boolean;
  };
  size: string;
  createdAt: string;
  yearbuilt: number;
  status: string;
  description: string;
}

export const counties = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita/Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans Nzoia",
  "Uasin Gishu",
  "Elgeyo/Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi City",
];

export type userPublisher = {
  _id: string;
  userId: string;
  username: string;
  email: string;
  kikaoType: "Landlord" | "Tenant";
  date: Date;
  business: {
    name: string;
    location: string;
    phone: string;
    businessType: string;
    city: string;
  };
};

export function createDefaultProfile(id: string): userPublisher {
  return {
    _id: ``,
    userId: id,
    username: ``,
    email: ``,
    kikaoType: `Tenant`,
    date: new Date(),
    business: {
      name: "",
      location: "",
      phone: "",
      businessType: "",
      city: "",
    },
  };
}
export interface houseFeature {
  name: string;
  _id: number;
  location: string;
  images: string[];
  listedOn: string;
  dateAvailable: string;
  type: string;
  laundry: string;
  cooling: string;
  City: string;
  yearBuilt: number;
  size: string;
  landSize: string;
  parkingArea: boolean;
}
export interface userReview {
  house_id: string;
  user_id: string;
  rating: number;
  comment: string;
  listing_author_id: string;
}
export interface listing {
  listingAuthor: Record<string, userPublisher>;
  bookmarks: string[];
  houseListing: Record<string, houseSchema>;
  authorReviews: Record<string, userReview>;
}

export function createDefaultListing(id: string): houseSchema {
  return {
    _id: ``,
    id: ``,
    userId: id,
    name: ``,
    location: ``,
    county: ``,
    images: [``],
    rate: {
      price: 0,
      duration: ``,
      countryCode: ``,
    },
    compartments: {
      bedrooms: 0,
      totalRooms: ``,
      washRooms: 0,
      parking: false,
      roomNumber: false,
      security: false,
      WIFI: false,
      garbageCollection: false,
    },
    size: ``,
    createdAt: ``,
    yearbuilt: 0,
    status: ``,
    description: ``,
  };
}

export interface commonSize {
  name: string;
  size: string;
}

export const commonSizes: commonSize[] = [
  {
    name: "Studio Apartments",
    size: "600",
  },
  {
    name: "1-bedroom apartments",
    size: "900",
  },
  {
    name: "2-bedroom apartments",
    size: "1200",
  },
  {
    name: "3-bedroom apartments",
    size: "1500",
  },
  {
    name: "Single-family home",
    size: "2500",
  },
  {
    name: "Multi-family home",
    size: "3000",
  },
  {
    name: "Attractions",
    size: "5000",
  },
];

export const houseType = [
  "Studio Apartments",
  "1-bedroom apartments",
  "2-bedroom apartments",
  "3-bedroom apartments",
  "Single-family home",
  "Multi-family home",
  "Attractions",
];

export const housePrice = [
  {
    pString: "3,000 - 10,000",
    price: 10000,
  },
  {
    pString: "10,000 - 25,000",
    price: 25000,
  },
  {
    pString: "25,000 - 55,000",
    price: 55000,
  },
  {
    pString: "55,000 - 300,000",
    price: 300000,
  },
];

export const prices = [
  "3,000 - 10,000",
  "10,000 - 25,000",
  "25,000 - 55,000",
  "55,000 - 300,000",
];

export type emitParams = {
  location: string;
  price: number;
  size: string;
};

export type priceRange =
  | `3,000 - 10,000`
  | `10,000 - 25,000`
  | ` 25,000 - 55,000`
  | `55,000 - 300,000`;

export type productType = `rental` | `airbnb`;
export type sortParam = {
  prdType: productType;
  date: string;
  price: priceRange;
  location: string;
};

export type house = houseSchema[];
export interface RootState {
  listings: houseSchema[];
  showLogin: boolean;
  userListings: Record<string, house>;
}
