<script setup lang="ts">
import { computed } from "vue";
import { useRootStore } from "@/store";

import SortListings from "@/components/SortListings.vue";
import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";

const listings = computed(() => useRootStore().$state.listings);

// methods
function reload() {
  window.location.reload();
}
//
</script>
<template>
  <div class="w-4/5 lg:w-[1200px] mx-auto">
    <SortListings class="w-full mx-auto mt-8" />
    <div
      v-if="listings.length > 0"
      class="flex flex-wrap mt-4 mb-20 justify-center w-full"
    >
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
      <div class="text-center my-20 w-96 mx-auto tracking-normal font-bold">
        <h2 class="text-2xl">
          Sorry, we couldn't find listings that match your search at this time.
        </h2>
        <button
          class="py-2 px-6 bg-indigo-50 text-indigo-500 border rounded mt-3"
          @click="reload"
        >
          Browse Listings
        </button>
      </div>
    </div>

    <div v-else class="flex flex-wrap mt-4 mb-20 justify-center w-full">
      <ListingSkeleton v-for="i in 12" :key="i" />
    </div>
  </div>
</template>
