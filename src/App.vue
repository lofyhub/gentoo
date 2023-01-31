<script setup lang="ts">
import { computed } from "vue";
import { useHead } from "unhead";

import Footer from "@/components/Footer.vue";
import HeaderVue from "@/components/Header.vue";
import LoginPopup from "@/components/popups/LoginPopup.vue";

import { useRootStore } from "@/store/index";
import { uselistingStore } from "@/store/listing";
import { useSessionStore } from "./store/session";

useHead({
  title: "Kikao | Find your next home with us",
});

const store = useRootStore();
const listingStore = uselistingStore();
const session = useSessionStore();

const showLogin = computed(() => store.$state.showLogin);
if (session.$state.userId) {
  listingStore.fetchBookmarks();
}
</script>
<template>
  <div>
    <HeaderVue />
    <router-view :key="$route.path" />
    <Footer />

    <Teleport to="body">
      <LoginPopup v-if="showLogin" />
    </Teleport>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(255 255 255);
  scroll-behavior: smooth;
}
</style>
