import { defineStore } from "pinia";
import { RootState, houseSchema } from "@/temp/types";
import { handleError, toastSuccess, toastWarning } from "@/plugins/toast";
import axios from "axios";

import { baseUrl } from "../env";
import { getToken } from "@/helpers/helpers";

export const useRootStore = defineStore("rootStore", {
  state: (): RootState => {
    return {
      listings: [] as houseSchema[],
      showLogin: false,
      showAddlisting: false,
      userListings: {},
    };
  },
  persist: true,
  actions: {
    async fetchListings() {
      try {
        const res = await axios.get(`${baseUrl}/listings`);
        const data = await res.data.data.listings;
        this.listings = data;
      } catch (error) {
        handleError(error);
      }
    },
    async authorListings(Id: string) {
      try {
        const token = getToken();

        const headers = {
          "Content-Type": "application/json",
          "x-access-token": token,
        };
        const res = await axios.post(
          `${baseUrl}author/listings`,
          { Id },
          {
            headers,
          }
        );

        this.userListings[Id] = await res.data.data;
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
        const token = getToken();

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

        const res = await axios.post(`${baseUrl}/reviews`, bodyData, {
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
    toggleShowListing() {
      this.showAddlisting = !this.showAddlisting;
    },
  },
  getters: {
    getListingById: (state) => {
      return (id: string) =>
        state.listings.find((listing) => listing.id === id);
    },
    getAuthorListings: (state) => (id: string) => {
      if (state.userListings[id]) {
        return state.userListings[id];
      }
      return [];
    },
  },
});
