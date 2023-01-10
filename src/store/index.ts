import { defineStore } from "pinia";
import { houseSamples, houseSchema } from "@/temp/housestemp";
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
}

export const useRootStore = defineStore(`rootStore`, {
  state: (): RootState => {
    return {
      listings: [...houseSamples],
    };
  },
  persist: false,
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
  },
  getters: {},
});
