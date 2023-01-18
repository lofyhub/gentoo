<script setup lang="ts">
import { computed } from "vue";
import { useSessionStore } from "@/store/session";
import ListingPreview from "@/components/ListingPreview.vue";
import { useRootStore } from "@/store";

const store = useSessionStore();
const rootStore = useRootStore();

rootStore.authorListings();
const authorListings = computed(() => rootStore.$state.userListings);

// methods
</script>
<template>
  <!-- Dashboard to add, delete, edit and view listings -->
  <div class="flex flex-wrap w-3/4 mx-auto my-8" v-if="store.$state._id">
    <ListingPreview
      v-for="listing in authorListings"
      :key="listing._id"
      :listing="listing"
    />
  </div>
  <div v-else class="text-center font-normal py-10">
    <p class="text-2xl">You havent posted any house listing</p>
    <p class="text-base py-6">Your posted listings will appear here</p>
    <router-link
      to="/dashboard/addlisting"
      class="py-2 px-4 border border-indigo-500 rounded text-gray-900 hover:bg-indigo-500 hover:text-white shadow transition transform"
      >Post a listing</router-link
    >
  </div>
</template>
