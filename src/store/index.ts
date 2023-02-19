import { defineStore } from "pinia";
import { RootState } from "@/temp/types";
import { handleError, toastError, toastWarning } from "@/plugins/toast";
import axios from "axios";

import { env } from "@/env";

export const useRootStore = defineStore("rootStore", {
  state: (): RootState => {
    return {
      listings: [],
      showLogin: false,
      userListings: {},
    };
  },
  persist: true,
  actions: {
    async fetchListings() {
      try {
        const res = await axios.get(`${env}/listings`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const { listings } = await res.data;

        this.listings = listings;
      } catch (error) {
        handleError(error);
      }
    },
    async authorListings(id: string) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await axios.post(
          `${env}/author/listings`,
          { Id: id },
          { headers: headers }
        );
        this.userListings[id] = res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return toastWarning(error.response.data.error);
        }
        toastError(error as string);
      }
    },
    removeDeletedListing(id: string) {
      delete this.userListings[id];
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
    getAuthorReviews: (state) => (id: string) => {
      if (state.userListings[id]) {
        return state.userListings[id];
      }
      return [];
    },
  },
});
