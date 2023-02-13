import { defineStore } from "pinia";
import { useSessionStore } from "./session";
import { toastError, toastSuccess, toastWarning } from "@/plugins/toast";

import axios from "axios";
import { env } from "@/env";
export interface lAuthor {
  _id: number;
  username: string;
  userId: string;
  email: string;
  regDate: string;
  kikaoType: string;
}
interface listing {
  listingAuthor: lAuthor;
  bookmarks: string[];
}

export const uselistingStore = defineStore(`listingStore`, {
  state: (): listing => {
    return {
      listingAuthor: {} as lAuthor,
      bookmarks: [],
    };
  },
  persist: true,
  actions: {
    clearBookmarks() {
      this.bookmarks = [];
      this.listingAuthor = {} as lAuthor;
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
        if (axios.isAxiosError(error) && error.response) {
          toastWarning(error.response.data.error);
        } else {
          toastError("Something went wrong");
        }
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
        if (axios.isAxiosError(error) && error.response) {
          toastWarning(error.response.data.message);
        } else {
          console.log(error);
          toastError(error as string);
        }
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
        if (axios.isAxiosError(error) && error.response) {
          toastWarning(error.response.data.message);
        }
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
        if (axios.isAxiosError(error) && error.response) {
          toastWarning(error.response.data.message);
        } else {
          toastError(error as string);
        }
      }
    },
  },
  getters: {},
});
