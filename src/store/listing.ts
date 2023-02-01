import { defineStore } from "pinia";
import { useSessionStore } from "./session";
import { toastSuccess } from "@/plugins/toast";

import axios from "axios";
import { env } from "@/env";

interface listing {
  listingAuthor: unknown[];
  bookmarks: string[];
}

export const uselistingStore = defineStore(`listingStore`, {
  state: (): listing => {
    return {
      listingAuthor: [],
      bookmarks: [],
    };
  },
  persist: true,
  actions: {
    clearBookmarks() {
      this.bookmarks = [];
    },
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
    async fetchBookmarks() {
      try {
        const token = localStorage.getItem("kikao-token");
        if (!token) throw new Error("Token is not found in localStorage");

        const data = {
          userid: useSessionStore().$state.userId,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };

        const res = await axios.post(`${env}/user/bookmarks`, data, config);
        const bookmarks = await res.data.bookmarks[0].bookmarks;
        this.bookmarks = bookmarks;
      } catch (error) {
        console.log(error);
      }
    },
    async addBookmark(id: string) {
      try {
        const token = localStorage.getItem("kikao-token");
        if (!token) throw new Error("Token is not found in localStorage");

        const data = {
          userid: useSessionStore().$state.userId,
          Id: id,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };

        const res = await axios.post(`${env}/bookmarks`, data, config);
        if (res.status === 200) {
          toastSuccess(`Listing added to your bookmarks`);
        }
        this.bookmarks.push(id);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBookmark(id: string) {
      try {
        const token = localStorage.getItem("kikao-token");
        if (!token) throw new Error("Token is not found in localStorage");

        const data = {
          userid: useSessionStore().$state.userId,
          Id: id,
        };
        const header = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };

        const res = await axios.post(`${env}/delete/bookmarks`, data, header);
        if (res.status === 200) {
          toastSuccess(`Listing removed from bookmarks`);
        }
        this.bookmarks = this.bookmarks.filter((item) => item !== id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
