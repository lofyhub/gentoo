import { defineStore } from "pinia";
import { houseSchema } from "@/temp/housestemp";
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
export interface RootState {
  listings: houseSchema[];
  showLogin: boolean;
  showSignup: boolean;
}

export const useRootStore = defineStore(`rootStore`, {
  state: (): RootState => {
    return {
      listings: [],
      showLogin: false,
      showSignup: false,
    };
  },
  persist: true,
  actions: {
    sortListing(location: string) {
      const sorted = this.listings.filter((listing: houseSchema) =>
        listing.location.toLowerCase().includes(location.toLowerCase())
      );
      if (sorted.length < 1) {
        this.listings = [];
      }
      this.listings = sorted;
    },
    async fetchListings() {
      try {
        const res = await fetch(`http://localhost:9000/listings`);
        const data = await res.json();
        this.listings = data.listings;
      } catch (error) {
        console.log(error);
      }
    },
    toggleLogin() {
      this.showLogin = !this.showLogin;
    },
    toggleSignup() {
      this.showSignup = !this.showSignup;
    },
  },
  getters: {
    getListingById: (state) => {
      return (id: string) =>
        state.listings.find((listing) => listing._id === id);
    },
  },
});
