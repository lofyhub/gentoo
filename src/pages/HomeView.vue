<script setup lang="ts">
import HomeIntro from "@/components/HomeIntro.vue";
import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";

import { onBeforeMount, ref, computed } from "vue";
import { useRootStore } from "@/store";
import { useRouter } from "vue-router";

import { sortParams, houseSchema } from "@/temp/types";

const store = useRootStore();
const router = useRouter();
const allListings = ref<houseSchema[]>([]);
const listings = ref<houseSchema[]>([]);

// methods

function gotoListing() {
  router.push("/listings");
}

onBeforeMount(async () => await handleSort);

function handleSort(values: sortParams) {
  if (!values) {
    listings.value = computed(() => store.$state.listings["all"] ?? []);
  } else {
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
    listings.value = filteredListings;
  }
}
</script>

<template>
  <div class="home">
    <div class="sticky top-0 z-30">
      <div class="transform translate-y-0">
        <HomeIntro @sort-values="handleSort" />
      </div>
    </div>
    <div class="w-full lg:w-[1400px] lg:mx-auto min-h-screen">
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
  </div>
</template>
