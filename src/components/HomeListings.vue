<script setup lang="ts">
import { useRootStore } from "@/store";
import { useRouter } from "vue-router";

import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";
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
  <div class="w-full lg:w-[1200px] lg:mx-auto">
    <div class="text-center mt-10">
      <h1 class="h2">Featured Listings</h1>
      <p class="py-4 text-lg">Popular and most recent listings</p>
    </div>
    <div v-if="listings">
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
      <div class="my-8 flex justify-center">
        <button
          class="py-2 px-10 app-text bg-indigo-50 border-2 rounded-sm font-bold transition duration-500 ease-in-out flex hover:bg-indigo-100"
          type="submit"
          @click="gotoListing"
        >
          <span class="inline">See more listings</span>
          <LeftIcon />
        </button>
      </div>
    </div>
    <div v-else class="flex flex-wrap">
      <ListingSkeleton v-for="i in 8" :key="i" />
    </div>
  </div>
</template>
