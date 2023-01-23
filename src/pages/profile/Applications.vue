<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import { useRoute } from "vue-router";
import { useRootStore } from "@/store/index";
import Profile from "@/components/Profile.vue";

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
  <div v-if="store.$state._id">
    <!-- Dashboard to add, delete, edit and view listings -->
    <div class="h-[310px] pt-3">
      <Profile />
    </div>
    <div class="flex items-center justify-center font-semibold text-1xl pb-3">
      <router-link :to="'/dashboard/'" :class="getStyles('Listings')">
        <span class="px-4">Your Listings</span>
      </router-link>
      <router-link
        :to="'/dashboard/addlisting'"
        :class="getStyles('addlisting')"
      >
        <span class="px-8">Post Listing</span>
      </router-link>
      <router-link :to="'/dashboard/listings'" :class="getStyles('Guidelines')">
        <span class="px-8">Guides</span>
      </router-link>
    </div>
    <hr class="border-gray-200 dark:border-gray-700" />
    <router-view></router-view>
  </div>
</template>
