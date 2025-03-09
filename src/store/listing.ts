import { defineStore } from "pinia";
import { useSessionStore } from "./session";
import { toastError, toastSuccess, toastWarning } from "@/plugins/toast";

import axios from "axios";
import { env } from "@/env";
import { createDefaultListing, listing } from "@/temp/types";
import { getToken } from "@/helpers/helpers";

export const uselistingStore = defineStore(`listingStore`, {
  state: (): listing => {
    return {
      listingAuthor: {},
      bookmarks: [],
      houseListing: {},
      authorReviews: {},
    };
  },
  persist: true,
  actions: {
    clearBookmarks() {
      this.bookmarks = [];
    },
    async fetchAuthorReviews(id: string) {
      try {
        const bodyData = {
          authorId: id,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          `${env}/author/reviews/`,
          bodyData,
          config
        );
        const reviews = await res.data;
        this.authorReviews[id] = reviews;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return toastWarning(error.response.data.message);
        }
        console.log(error);
      }
    },
    async getListingAuthor(id: string) {
      try {
        const bodyData = {
          id: id,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(`${env}/listing/author`, bodyData, config);
        const { data } = await res.data;
        this.listingAuthor[id] = data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return toastWarning(error.response.data.message);
        }
        console.log(error);
      }
    },
    async fetchListing(id: string) {
      try {
        const res = await axios.post(`${env}/user/listing`, { id: id });
        const listing = await res.data.data;
        this.houseListing[id] = listing;
        // TODO: This is an untipattern maybe find  a better way to handle this
        this.getListingAuthor(listing.userId);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchBookmarks() {
      try {
        const token = getToken();
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
          return toastWarning(error.response.data.message);
        }
        console.log(error);
      }
    },
    async addBookmark(id: string) {
      try {
        const token = getToken();
        if (!token) throw new Error("Token is not found in localStorage");

        const data = {
          userid: useSessionStore().$state.userId,
          Id: id,
        };
        const header = {
          "Content-Type": "application/json",
          "x-access-token": token,
        };

        const res = await axios.post(`${env}/bookmarks`, data, {
          headers: header,
        });

        if (res.status === 200) {
          toastSuccess(`Listing added to your bookmarks`);
        }
        this.bookmarks.push(id);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toastError(error.response.data.error);
        }
      }
    },
    async deleteBookmark(id: string) {
      try {
        const token = getToken();
        if (!token) throw new Error("Token is not found in localStorage");

        const data = {
          userid: useSessionStore().$state.userId,
          Id: id,
        };
        const header = {
          "Content-Type": "application/json",
          "x-access-token": token,
        };

        const res = await axios.post(`${env}/delete/bookmarks`, data, {
          headers: header,
        });
        if (res.status === 200) {
          toastSuccess(`Listing removed from bookmarks`);
        }
        this.bookmarks = this.bookmarks.filter((item) => item !== id);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toastWarning(error.response.data.message);
        }
        console.log(error);
      }
    },
  },
  getters: {
    getProfile: (state: listing) => (id: string) => {
      if (state.listingAuthor[id]) {
        return state.listingAuthor[id];
      }
    },
    getAuthorReviews: (state: listing) => (id: string) => {
      if (state.authorReviews[id]) {
        return state.authorReviews[id];
      }
      return [];
    },
    getListingDetails: (state: listing) => (id: string) => {
      if (state.houseListing[id]) {
        return state.houseListing[id];
      }

      return createDefaultListing(id);
    },
  },
});
