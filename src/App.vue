<script setup lang="ts">
import { computed } from "vue";
import { useHead } from "unhead";

import Footer from "@/components/Footer.vue";
import HeaderVue from "./components/Header.vue";
import LoginPopup from "@/components/popups/LoginPopup.vue";
import SignupPopup from "@/components/popups/SignupPopup.vue";

import { useRootStore } from "@/store/index";

useHead({
  title: "Kikao | Find your next home with us",
});

const store = useRootStore();

const showLogin = computed(() => store.$state.showLogin);
const showSignup = computed(() => store.$state.showSignup);
</script>

<template>
  <HeaderVue />
  <router-view />
  <Footer />

  <Teleport to="body">
    <LoginPopup v-if="showLogin" />
    <SignupPopup v-if="showSignup" />
  </Teleport>
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
  background-color: rgb(248 250 252);
}
</style>
