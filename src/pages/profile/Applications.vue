<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import { useRoute } from "vue-router";
import { useRootStore } from "@/store/index";

import { useHead } from "unhead";
import { onMounted } from "vue";

useHead({
  title: "Kikao | Dashboard",
});

const store = useSessionStore();
const rootStore = useRootStore();
const route = useRoute();

onMounted(async () => {
  if (!store.$state._id) {
    rootStore.toggleLogin();
  }
});

// methods
function getStyles(tab: string) {
  let res = ``;
  if (route.name === tab) {
    res += ` text-indigo-500 font-bold`;
    return res;
  }

  res += ` text-gray-900 dark:text-gray-300`;
  return res;
}
</script>
<template>
  <div v-if="store.$state._id" class="min-h-screen">
    <!-- Dashboard to add, delete, edit and view listings -->
    <div
      class="flex font-semibold text-1xl pt-10 pb-3 justify-center grid-col gap-2"
    >
      <router-link
        :to="'/dashboard/'"
        class="border border-gray-200 py-2 px-3 rounded-sm text-center"
        :class="getStyles('Listings')"
      >
        Your Listings
      </router-link>
      <router-link
        :to="'/dashboard/addlisting'"
        class="border border-gray-200 py-2 px-3 rounded-sm"
        :class="getStyles('addlisting')"
      >
        Post Listing
      </router-link>
      <router-link
        :to="'/dashboard/listings'"
        class="border border-gray-200 py-2 px-3 rounded-sm"
        :class="getStyles('Guidelines')"
      >
        Guides
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
