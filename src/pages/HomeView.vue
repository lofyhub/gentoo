<script setup lang="ts">
import HomeIntro from "@/components/HomeIntro.vue";
import HomeListings from "@/components/HomeListings.vue";
import WhyUs from "@/components/WhyUs.vue";
import Testimonials from "@/components/Testimonials.vue";
import InfoSection from "@/components/InfoSection.vue";
</script>
<template>
  <div class="home">
    <HomeIntro />
    <InfoSection />
    <HomeListings />
    <WhyUs />
    <Testimonials />
  </div>
</template>
