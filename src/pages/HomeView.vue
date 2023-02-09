<script setup lang="ts">
import HomeIntro from "@/components/HomeIntro.vue";
import HomeListings from "@/components/HomeListings.vue";
import WhyUs from "@/components/WhyUs.vue";
import { useRootStore } from "@/store";

const rootStore = useRootStore();
rootStore.fetchListings();
</script>
<template>
  <div class="home">
    <HomeIntro />
    <HomeListings />
    <WhyUs />
  </div>
</template>
