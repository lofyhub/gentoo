<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import HeaderVue from "./components/Header.vue";
</script>

<template>
  <HeaderVue />
  <router-view />
  <Footer />
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
