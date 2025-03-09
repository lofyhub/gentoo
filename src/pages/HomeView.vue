<script setup lang="ts">
import HomeIntro from "@/components/HomeIntro.vue";
import Listing from "@/components/Listing.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";

import { marketingHero } from "@/config/hero";
import { computed } from "vue";
import { useRootStore } from "@/store";

const store = useRootStore();
const listings = computed(() => store.$state.listings);

// methods
</script>

<template>
  <div class="home">
    <div>
      <HomeIntro />
    </div>
    <div class="w-3/4 mx-auto mb-20">
      <h4 class="text-center text-5xl py-10">What We Offer</h4>
      <div class="flex flex-wrap justify-center gap-10">
        <div
          v-for="mark in marketingHero"
          :key="mark.name"
          class="w-[400px] border rounded-lg overflow-hidden hover:bg-gray-100 border-gray-200 flex br-5 shadow-sm py-3 px-5 flex-col"
        >
          <h2 class="text-3xl font-semibold">{{ mark.name }}</h2>
          <h4 class="text-xl font-medium py-2">{{ mark.title }}</h4>
          <p>{{ mark.about }}</p>
        </div>
      </div>
      <!-- some listings section -->
      <div>
        <h4 class="text-center text-5xl py-10">Latest Listings</h4>
        <div class="w-full min-h-screen mx-auto mb-20">
          <div v-if="!listings" class="flex flex-wrap justify-center pt-0 mt-0">
            <ListingSkeleton v-for="i in 8" :key="i" />
          </div>
          <div
            v-else-if="listings.length === 0"
            class="flex flex-wrap justify-center pt-0 mt-0"
          >
            <ListingSkeleton v-for="i in 8" :key="i" />
          </div>
          <div
            v-else
            class="flex flex-wrap justify-center py-10 gap-x-7 gap-y-4"
          >
            <Listing
              v-for="listing in listings"
              :key="listing.id"
              :listing="listing"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
