import { defineStore } from "pinia";
import { houseSchema } from "@/temp/housestemp";
import { handleError } from "@/plugins/toast";
import axios from "axios";
import { useSessionStore } from "./session";
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
  userListings: houseSchema[];
}

export const useRootStore = defineStore(`rootStore`, {
  state: (): RootState => {
    return {
      listings: [],
      showLogin: false,
      showSignup: false,
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
        const res = await fetch(`http://localhost:9000/listings`);
        const data = await res.json();
        this.listings = data.listings;
      } catch (error) {
        console.log(error);
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
          "http://localhost:9000/author/listings",
          { Id: Id },
          { headers: headers }
        );
        console.log(res.data.data);
        this.userListings = res.data.data;
        console.log(this.userListings);
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
