import { defineStore } from "pinia";
import { RootState } from "@/temp/types";
import { handleError, toastSuccess, toastWarning } from "@/plugins/toast";
import axios from "axios";

import { env } from "@/env";

export const useRootStore = defineStore("rootStore", {
  state: (): RootState => {
    return {
      listings: {},
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
        this.listings["all"] = listings;
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

        this.userListings[id] = await res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return toastWarning(error.response.data.error);
        }
      }
    },
    async handleReviewPosting(
      rating: number,
      comment: string,
      userId: string,
      listingId: string,
      authorId: string,
      name: string
    ) {
      try {
        const token = localStorage.getItem("kikao-token");
        if (!token) {
          throw new Error("Token is not found in localStorage");
        }

        const bodyData = {
          house_id: listingId,
          user_id: userId,
          rating,
          comment,
          listing_author_id: authorId,
          name,
        };

        const headers = {
          "Content-Type": "application/json",
          "x-access-token": token,
        };

        const res = await axios.post(`${env}/reviews`, bodyData, {
          headers,
        });

        if (res.status === 200) {
          toastSuccess("Your review has been successfully recorded");
          return;
        } else {
          throw new Error("Failed to post review");
        }
      } catch (error) {
        toastWarning("Failed to post review");
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
        state.listings["all"].find((listing) => listing._id === id);
    },
    getAuthorListings: (state) => (id: string) => {
      if (state.userListings[id]) {
        return state.userListings[id];
      }
      return [];
    },
  },
});
