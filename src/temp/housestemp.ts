export interface houseSchema {
  _id: string;
  id: string;
  userId: string;
  name: string;
  location: string;
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
  };
  size: string;
  createdAt: string;
  status: string;
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
// export const houseSamples: houseSchema[] = [
//   {
//     name: "Palm Harbour",
//     _id: 0,
//     location: "Tana River",
//     images: [
//       "https://images.pexels.com/photos/1004682/pexels-photo-1004682.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 5000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 3,
//       totalRooms: "7",
//       washRooms: 2,
//       parking: false,
//     },
//     size: "6*7.5 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Khetieas Viggel",
//     _id: 1,
//     location: "6789 Storm, Highland Lake, FL",
//     images: [
//       "https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 4500,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "5",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "4*7.5 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Eldoret Langas",
//     _id: 2,
//     location: "5670 Stacato, Langas",
//     images: [
//       "https://images.pexels.com/photos/4917105/pexels-photo-4917105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 8000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 1,
//       totalRooms: "7",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "7*7.5 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Poliview Avenue",
//     _id: 3,
//     location: "Tana River",
//     images: [
//       "https://images.pexels.com/photos/3054772/pexels-photo-3054772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 7000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "6",
//       washRooms: 1,
//       parking: false,
//     },
//     size: "7*7.5 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Garrix Street",
//     _id: 4,
//     location: "090 Higher Ground, MT",
//     images: [
//       "https://images.pexels.com/photos/6152380/pexels-photo-6152380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 8000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 3,
//       totalRooms: "8",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "7*8 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Matomo Beiber",
//     _id: 5,
//     location: "2699 Martin Avenue, VIP",
//     images: [
//       "https://images.pexels.com/photos/4915824/pexels-photo-4915824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 9000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 4,
//       totalRooms: "10",
//       washRooms: 2,
//       parking: true,
//     },
//     size: "9*8 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Vendelstraat",
//     _id: 6,
//     location: "805  Martin Avenue, VIP",
//     images: [
//       "https://images.pexels.com/photos/4946957/pexels-photo-4946957.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 12000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "6",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "9*8 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Pappillon",
//     _id: 7,
//     location: "029  MacKoe street",
//     images: [
//       "https://images.pexels.com/photos/4946696/pexels-photo-4946696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 8500,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "6",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "7*6.5 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Justin Myllo",
//     _id: 8,
//     location: "702 Strings, remember",
//     images: [
//       "https://images.pexels.com/photos/7476170/pexels-photo-7476170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 7500,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "6",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "7*6.5 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Mclean Van strat",
//     _id: 9,
//     location: "Tana River",
//     images: [
//       "https://images.pexels.com/photos/11718917/pexels-photo-11718917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 6000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 1,
//       totalRooms: "4",
//       washRooms: 1,
//       parking: true,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Scottsdale Kierland",
//     _id: 10,
//     location: "100. Scottsdale. AZ.",
//     images: [
//       "https://images.pexels.com/photos/2380249/pexels-photo-2380249.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 15000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "8",
//       washRooms: 2,
//       parking: true,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: " North Kierland",
//     _id: 11,
//     location: "15205 North Kierland Blvd. Suite 100",
//     images: [
//       "https://images.pexels.com/photos/8112848/pexels-photo-8112848.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 8000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 1,
//       totalRooms: "5",
//       washRooms: 2,
//       parking: false,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Lana apartments",
//     _id: 12,
//     location: "Joyland - Tairi Mbili",
//     images: [
//       "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 15000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "8",
//       washRooms: 2,
//       parking: true,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Roadblock Eldoret",
//     _id: 13,
//     location: "Daressallam next to Rabbii",
//     images: [
//       "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
//     ],
//     rate: {
//       price: 8000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 1,
//       totalRooms: "5",
//       washRooms: 2,
//       parking: false,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Faraja apartments",
//     _id: 14,
//     location: "Daresallam street",
//     images: [
//       "https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 15000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "8",
//       washRooms: 2,
//       parking: true,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Rice Apartments",
//     _id: 15,
//     location: "Mti moja - Mobito",
//     images: [
//       "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     ],
//     rate: {
//       price: 8000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 1,
//       totalRooms: "5",
//       washRooms: 2,
//       parking: false,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Bestview apartments",
//     _id: 16,
//     location: "9089 Kahoya, street",
//     images: [
//       "https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 15000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 2,
//       totalRooms: "8",
//       washRooms: 2,
//       parking: true,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
//   {
//     name: "Konza Apartments",
//     _id: 17,
//     location: "100 m, Mti moja",
//     images: [
//       "https://images.pexels.com/photos/2187662/pexels-photo-2187662.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     ],
//     rate: {
//       price: 8000,
//       duration: "month",
//       countryCode: "kshs",
//     },
//     compartments: {
//       bedrooms: 1,
//       totalRooms: "5",
//       washRooms: 2,
//       parking: false,
//     },
//     size: "7*7 m2",
//     createdAt: 230219,
//     status: "active",
//   },
// ];
