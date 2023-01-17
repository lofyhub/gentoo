<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import Profile from "@/components/Profile.vue";

import { useHead } from "unhead";

useHead({
  title: "Kikao | Dashboard",
});

const store = useSessionStore();

// methods
</script>
<template>
  <!-- Dashboard to add, delete, edit and view listings -->
  <div
    class="back h-[300px] bg-cover bg-left bg-no-repeat py-3"
    v-if="store.$state._id"
  >
    <Profile />
  </div>
  <div class="flex items-center justify-center my-4 font-semibold text-1xl">
    <router-link :to="'/dashboard/listings'" class="pb-1">
      <span class="px-4">Listings</span>
    </router-link>
    <router-link :to="'/dashboard/listings'" class="pb-1">
      <span class="px-4">Listings</span>
    </router-link>
  </div>

  <router-view></router-view>
</template>
<style>
.back {
  background-image: url("https://images.pexels.com/photos/950740/pexels-photo-950740.jpeg");
}
</style>
