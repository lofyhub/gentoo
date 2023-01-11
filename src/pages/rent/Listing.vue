<script setup lang="ts">
import { useRoute } from "vue-router";

import BackButton from "@/components/BackButton.vue";
import ListingHeader from "@/components/ListingHeader.vue";
import { useRootStore } from "@/store";

const store = useRootStore();
const idParam = useRoute().params.id as string;
const houseListing = store.getListingById(idParam);
</script>

<template>
  <div class="lg:w-[1200px] mx-auto">
    <div class="pt-8">
      <BackButton />
    </div>
    <div>
      <ListingHeader :listing="houseListing!" />
    </div>
  </div>
</template>
