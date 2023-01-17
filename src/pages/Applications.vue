<script setup lang="ts">
import { computed } from "vue";
import { useSessionStore } from "@/store/session";
import ListingPreview from "@/components/ListingPreview.vue";
import { useRootStore } from "@/store";

import { useHead } from "unhead";

useHead({
  title: "Kikao | Dashboard",
});

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
</template>
