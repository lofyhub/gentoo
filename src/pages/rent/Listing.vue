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
  <div class="w-[1130px] mx-auto">
    <div class="pt-6">
      <BackButton class="my-3" />
    </div>

    <ListingHeader :listing="houseListing!" />
  </div>
</template>
