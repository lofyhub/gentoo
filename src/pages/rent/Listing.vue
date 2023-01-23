<script setup lang="ts">
import { useRoute } from "vue-router";

import ListingHeader from "@/components/ListingHeader.vue";
import { useRootStore } from "@/store";

const store = useRootStore();
const idParam = useRoute().params.id as string;
const houseListing = store.getListingById(idParam);
</script>

<template>
  <div class="w-full lg:w-[1130px] mx-auto">
    <ListingHeader :listing="houseListing!" />
  </div>
</template>
