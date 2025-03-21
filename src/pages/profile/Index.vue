<script setup lang="ts">
import ListingPreview from "@/components/ListingPreview.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";

import { computed, onBeforeMount, ref } from "vue";
import { useRootStore } from "@/store";
import { useSessionStore } from "@/store/session";
import { useRoute } from "vue-router";

const rootStore = useRootStore();
const session = useSessionStore();
const route = useRoute();
const id = ref(route.query.user_id as string);

const authorListings = computed(() => rootStore.getAuthorListings(id.value));

onBeforeMount(() => {
  rootStore.authorListings(id.value);
});
</script>
<template>
  <!-- Dashboard to add, delete, edit and view listings -->
  <div>
    <div
      v-if="!authorListings"
      class="flex justify-center flex-wrap my-2 gap-x-4"
    >
      <ListingSkeleton v-for="i in 4" :key="i" />
    </div>
    <div
      v-else
      class="flex justify-center flex-wrap gap-y-2 gap-x-5 w-full lg:w-[1300px] mx-auto"
      :class="authorListings.length > 1 ? `justify-start` : `justify-center`"
    >
      <div v-for="listing in authorListings" :key="listing.id">
        <ListingPreview :listing="listing" />
      </div>
    </div>
  </div>
  <div
    v-if="Object.keys(authorListings).length === 0"
    class="text-center font-normal h-80 pt-10"
  >
    <p class="text-2xl font-medium">
      {{
        session.$state.userId === id
          ? `You haven't posted any house listing`
          : `There are currently no listings posted by this homeowner`
      }}
    </p>
    <p class="text-base py-3 font-normal">
      {{ session.$state.userId === id ? `Your` : `The` }}
      posted listings will appear here
    </p>
    <div class="flex justify-center">
      <router-link
        to="/dashboard/addlisting"
        class="py-2 px-6 border flex border-indigo-500 opacity-100 rounded text-base text-gray-900 hover:bg-indigo-500 hover:text-white shadow transition transform"
      >
        <span>Post a listing</span>
        <LeftIcon
      /></router-link>
    </div>
  </div>
</template>
