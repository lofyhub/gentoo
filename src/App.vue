<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useHead } from "unhead";
import Footer from "@/components/Footer.vue";
import HeaderVue from "@/components/Header.vue";
import LoginPopup from "@/components/popups/LoginPopup.vue";
import AddListing from "@/components/AddListing.vue";

import { useRootStore } from "@/store/index";

useHead({
  title: "Kikao | Find your next home with us",
});

const rootStore = useRootStore();
onBeforeMount(() => {
  rootStore.fetchListings();
});

const showLogin = computed(() => rootStore.$state.showLogin);
const showAddListing = computed(() => rootStore.$state.showAddlisting);
</script>
<template>
  <div>
    <HeaderVue />
    <router-view :key="$route.path" />
    <Footer />

    <Teleport to="body">
      <LoginPopup v-if="showLogin" />
      <AddListing v-if="showAddListing" />
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
