<script setup lang="ts">
import { useRoute } from "vue-router";
import { houseSamples } from "@/temp/housestemp";

import BackButton from "@/components/BackButton.vue";
import ListingHeader from "@/components/ListingHeader.vue";

const route = parseInt(useRoute().params.id as string, 10);
const houseListing = houseSamples.filter((a) => a._id === route);
</script>

<template>
  <div class="lg:w-[1200px] mx-auto">
    <div class="pt-8">
      <BackButton />
    </div>
    <div>
      <ListingHeader :listing="houseListing[houseListing.length - 1]" />
    </div>
  </div>
</template>
