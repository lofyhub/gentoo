export interface housefeatures {
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

export const houseFeature: housefeatures = {
  name: "Palm Harbour",
  _id: 0,
  location: "3560 Green Valley, Highland Lake, FL",
  images: [
    "https://images.pexels.com/photos/1004682/pexels-photo-1004682.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  listedOn: "1 week",
  dateAvailable: "active",
  type: "Home",
  laundry: "In Unit",
  cooling: "Ait conditioner",
  City: "Miami",
  yearBuilt: 2018,
  size: "2,173 sqft",
  landSize: "9,060 sqft",
  parkingArea: true,
};

export const commonSizes = [
  {
    name: "Studio Apartments",
    size: 600,
  },
  {
    name: "1-bedroom apartments",
    size: 900,
  },
  {
    name: "2-bedroom apartments",
    size: 1200,
  },
  {
    name: "3-bedroom apartments",
    size: 1500,
  },
  {
    name: "Single-family home",
    size: 2500,
  },
  {
    name: "Multi-family home",
    size: 3000,
  },
  {
    name: "Attractions",
    size: 5000,
  },
];
