import { defineStore } from "pinia";
import { RootState } from "@/temp/types";
import { handleError, toastError, toastWarning } from "@/plugins/toast";
import axios from "axios";
import { useSessionStore } from "./session";

import { env } from "@/env";

export const useRootStore = defineStore("rootStore", {
  state: (): RootState => {
    return {
      listings: [],
      showLogin: false,
      userListings: [],
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
    async authorListings() {
      const { $state } = useSessionStore();
      try {
        const Id: string = $state.userId;
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
        if (axios.isAxiosError(error) && error.response) {
          toastWarning(error.response.data.error);
        } else {
          toastError(error as string);
        }
      }
    },
    removeDeletedListing(id: string) {
      const index = this.userListings.findIndex(
        (listing) => listing._id === id
      );
      if (index !== -1) {
        this.userListings.splice(index, 1);
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
