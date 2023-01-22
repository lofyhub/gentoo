<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import ListingPreview from "@/components/ListingPreview.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";

import { computed } from "vue";
import { useRootStore } from "@/store";

const store = useSessionStore();
const rootStore = useRootStore();

rootStore.authorListings();
const authorListings = computed(() => rootStore.$state.userListings);

// methods
</script>
<template>
  <!-- Dashboard to add, delete, edit and view listings -->
  <div v-if="store.$state._id">
    <div v-if="authorListings" class="flex flex-wrap w-3/4 mx-auto my-8">
      <ListingPreview
        v-for="listing in authorListings"
        :key="listing._id"
        :listing="listing"
      />
    </div>
    <div v-else class="flex flex-wrap w-3/4 mx-auto my-8">
      <ListingSkeleton v-for="i in 8" :key="i" />
    </div>
  </div>
  <div v-if="authorListings.length === 0" class="text-center font-normal h-80">
    <p class="text-2xl font-medium">You haven't posted any house listing</p>
    <p class="text-base py-3 font-normal">
      Your posted listings will appear here
    </p>
    <div class="flex justify-center">
      <router-link
        to="/dashboard/addlisting"
        class="py-2 px-6 border flex border-indigo-500 rounded text-base text-gray-900 hover:bg-indigo-500 hover:text-white shadow transition transform"
      >
        <span>Post a listing</span>
        <LeftIcon
      /></router-link>
    </div>
  </div>
</template>
