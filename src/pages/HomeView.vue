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
    <div class="w-full lg:w-[1400px] mx-auto min-h-screen mb-20">
      <div v-if="!listings" class="flex flex-wrap mt-0 pt-0 justify-center">
        <ListingSkeleton v-for="i in 8" :key="i" />
      </div>
      <div v-else class="flex flex-wrap gap-x-5 justify-center">
        <Listing
          v-for="listing in filteredListings"
          :key="listing._id"
          :listing="listing"
        />
        <div v-if="filteredListings.length === 0" class="text-center py-20">
          <p>No listings were found with the provided sort details</p>
        </div>
      </div>
    </div>
  </div>
</template>
