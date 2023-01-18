<script setup lang="ts">
import { useRootStore } from "@/store";
import { useRouter } from "vue-router";

import Listing from "@/components/Listing.vue";
import { computed } from "vue";

const store = useRootStore();
const listings = computed(() => store.$state.listings.slice(0, 8));
const router = useRouter();

store.fetchListings();

// methods

function gotoListing() {
  router.push(`/listings`);
}
</script>
<template>
  <div class="lg:w-[1200px] mx-auto">
    <div class="text-center mt-10">
      <h1 class="text-4xl app-text font-normal">Featured Listings</h1>
      <p class="mt-4 text-lg">Popular and most recent listings</p>
    </div>
    <div class="flex flex-wrap mt-0 pt-0 justify-center">
      <Listing
        v-for="listing in listings"
        :key="listing._id"
        :_id="listing._id"
        :name="listing.name"
        :location="listing.location"
        :images="listing.images"
        :rate="listing.rate"
        :compartments="listing.compartments"
        :created-at="listing.createdAt"
        :status="listing.status"
        :size="listing.size"
      />
    </div>
    <div class="text-center my-10">
      <button
        class="py-2.5 px-16 app-text bg-indigo-50 border-2 rounded-sm font-bold transition duration-500 ease-in-out hover:bg-indigo-100"
        type="submit"
        @click="gotoListing"
      >
        See more listings
      </button>
    </div>
  </div>
</template>
