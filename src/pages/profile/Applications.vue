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
    <div class="back h-[300px] bg-cover bg-left bg-no-repeat py-3">
      <Profile />
    </div>
    <div
      class="flex items-center justify-center my-4 font-semibold text-1xl pb-1"
    >
      <router-link :to="'/dashboard/'" :class="getStyles('Guidelines')">
        <span class="px-8">Guides</span>
      </router-link>
      <router-link
        :to="'/dashboard/addlisting'"
        :class="getStyles('addlisting')"
      >
        <span class="px-8">Post Listing</span>
      </router-link>
      <router-link :to="'/dashboard/listings'" :class="getStyles('Listings')">
        <span class="px-8">Your Listings</span>
      </router-link>
    </div>
    <hr class="border-gray-200 dark:border-gray-700" />

    <router-view></router-view>
  </div>
  <div class="h-screen" v-else></div>
</template>
<style>
.back {
  background-image: url("https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1600");
}
</style>
