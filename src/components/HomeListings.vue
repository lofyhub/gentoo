<script setup lang="ts">
import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";
import SortListings from "@/components/SortListings.vue";

import { computed } from "vue";
import { useRootStore } from "@/store";
import { useRouter } from "vue-router";
import { emitParams } from "@/temp/types";

const store = useRootStore();
const listings = computed(() => store.$state.listings);
const router = useRouter();

// methods

function gotoListing() {
  router.push(`/listings`);
}

function handleSort(events: emitParams) {
  const sortedListing = listings.value.filter((house) => {
    return (
      (events.price === undefined || house.rate.price <= events.price) &&
      (events.location === undefined || house.location === events.location) &&
      (events.size === undefined || house.size === events.size)
    );
  });
  console.log(sortedListing);
}
</script>
<template>
  <div class="w-full lg:w-[1200px] lg:mx-auto">
    <SortListings class="w-full mx-auto mt-10" @sort-params="handleSort" />
    <div v-if="listings.length > 0">
      <div class="flex flex-wrap mt-0 pt-0 justify-center">
        <Listing
          v-for="listing in listings"
          :key="listing._id"
          :listing="listing"
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
    <div v-else class="flex flex-wrap mt-0 pt-0 justify-center">
      <ListingSkeleton v-for="i in 8" :key="i" />
    </div>
  </div>
</template>
