<script setup lang="ts">
import HomeIntro from "@/components/HomeIntro.vue";
import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";

import { computed, ref } from "vue";
import { useRootStore } from "@/store";

import { houseSchema, sortParams } from "@/temp/types";

const store = useRootStore();
const listings = computed(() => store.$state.listings["all"]);
const filteredListings = ref<houseSchema[]>(listings.value);

// methods

function handleSort(values: sortParams) {
  const { location, price, size } = values;
  // Reset the filtered listings to original state
  filteredListings.value = listings.value;
  // Check if any of the values exist
  if (!location && !price && !size) {
    return;
  }

  const filterListings = listings.value.filter(
    ({ county, rate, size: houseSize }) => {
      return (
        (!location || county === location) &&
        (!price || rate.price === price) &&
        (!size || houseSize === size)
      );
    }
  );

  filteredListings.value = filterListings;
}
</script>

<template>
  <div class="home">
    <div>
      <HomeIntro @sort-values="handleSort" />
    </div>
    <div class="w-full min-h-screen mx-auto mb-20">
      <div v-if="!listings" class="flex flex-wrap justify-center pt-0 mt-0">
        <ListingSkeleton v-for="i in 8" :key="i" />
      </div>
      <div v-else class="flex flex-wrap justify-center py-10 gap-x-7 gap-y-4">
        <Listing
          v-for="listing in filteredListings"
          :key="listing._id"
          :listing="listing"
        />
        <div v-if="filteredListings.length === 0" class="py-20 text-center">
          <p>No listings were found with the provided sort details</p>
        </div>
      </div>
    </div>
  </div>
</template>
