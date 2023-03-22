<script setup lang="ts">
import HomeIntro from "@/components/HomeIntro.vue";
import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";

import { onBeforeMount, computed } from "vue";
import { useRootStore } from "@/store";

import { sortParams } from "@/temp/types";

const store = useRootStore();
const listings = computed(() => store.$state.listings["all"]);

// methods

onBeforeMount(async () => await handleSort);

function handleSort(values: sortParams) {
  const filteredListings = store.$state.listings["all"].filter((house) => {
    const { location, price, size } = values;
    if (location && house.location !== location) {
      return false;
    }
    if (price && house.rate.price !== price) {
      return false;
    }
    if (size && house.size !== size) {
      return false;
    }
    return true;
  });
  return filteredListings;
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
          v-for="listing in listings"
          :key="listing._id"
          :listing="listing"
        />
      </div>
    </div>
  </div>
</template>
