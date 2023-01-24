import { defineStore } from "pinia";
import { houseSchema } from "@/temp/housestemp";
import { handleError } from "@/plugins/toast";
import axios from "axios";
import { useSessionStore } from "./session";

import { env } from "@/env";
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
  userListings: houseSchema[];
}

export const useRootStore = defineStore(`rootStore`, {
  state: (): RootState => {
    return {
      listings: [],
      showLogin: false,
      userListings: [],
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
        const res = await fetch(`${env}/listings`);
        const data = await res.json();
        this.listings = data.listings;
      } catch (error) {
        handleError(error);
      }
    },
    // fetch user listing for dashbboard
    async authorListings() {
      try {
        const Id: string = useSessionStore().$state.userId;
        const token = localStorage.getItem("kikao-token");
        const headers = {
          "Content-Type": "application/json",
          "x-access-token": token,
        };
        const res = await axios.post(
          `${env}/author/listings`,
          { Id: Id },
          { headers: headers }
        );
        this.userListings = res.data.data;
      } catch (error) {
        handleError(error);
      }
    },
    toggleLogin() {
      this.showLogin = !this.showLogin;
    },
  },
  getters: {
    getListingById: (state) => {
      return (id: string) =>
        state.listings.find((listing) => listing._id === id);
    },
  },
});
