<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import ListingPreview from "@/components/ListingPreview.vue";

const store = useSessionStore();
</script>
<template>
  <!-- Dashboard to add, delete, edit and view listings -->
  <div
    class="flex w-full lg:w-3/4 sm:w-full mx-auto min-h-screen"
    v-if="store.$state._id"
  >
    <div class="w-3/4 mx-auto border border-gray-200 bg-white">
      <h2
        class="py-6 text-2xl font-normal text-center border-b border-gray-200"
      >
        Your listings overview
      </h2>
      <div>
        <ListingPreview />
      </div>
    </div>
  </div>
</template>
