import { defineStore } from "pinia";
import axios from "axios";

import { env } from "@/env";

export const uselistingStore = defineStore(`listingStore`, {
  state: () => {
    return {
      listingAuthor: [],
    };
  },
  persist: true,
  actions: {
    async getListingAuthor(id: string) {
      try {
        const data = {
          _id: id,
        };

        const token = localStorage.getItem("kikao-token");
        if (!token) throw new Error("Token is not found in localStorage");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };

        const res = await axios.post(`${env}/listing/author`, data, config);
        this.listingAuthor = await res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
