<script setup lang="ts">
import { computed } from "vue";
import { useRootStore } from "@/store";

import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import router from "@/router";

const rootStore = useRootStore();
const sortedListings = computed(() => rootStore.$state.listings["all"]);

// methods
function reload() {
  router.push("/listings");
}
</script>
<template>
  <div class="w-4/5 lg:w-[1400px] mx-auto min-h-screen">
    <div
      v-if="sortedListings.length > 0"
      class="flex flex-wrap mt-20 mb-20 justify-start w-full gap-x-5"
    >
      <Listing
        v-for="listing in sortedListings"
        :key="listing._id"
        :listing="listing"
      />
    </div>
    <div v-else class="flex flex-wrap mt-4 mb-20 justify-center w-full">
      <ListingSkeleton v-for="i in 8" :key="i" />
    </div>

    <div>
      <div
        v-if="sortedListings.length === 0"
        class="flex flex-wrap mt-4 mb-20 pt-10 justify-center w-full"
      >
        <div class="text-center my-20 w-96 pt-32 mx-auto tracking-normal">
          <h2 class="text-2xl text-gray-400">
            Sorry, we couldn't find listings that match your search at this
            time.
          </h2>
          <button
            class="py-2 px-6 bg-indigo-50 text-indigo-500 border rounded mt-3"
            @click="reload"
          >
            Browse Listings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
