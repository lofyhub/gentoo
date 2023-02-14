<script setup lang="ts">
import { useRoute } from "vue-router";

import ListingHeader from "@/components/ListingHeader.vue";
import Loading from "@/components/icons/Loading.vue";
import { env } from "@/env";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { houseSchema } from "@/temp/housestemp";

const route = useRoute();
const houseListing = ref<houseSchema>();
const id = route.params.id as string;

// methods
async function fetchListing() {
  try {
    const res = await axios.post(`${env}/user/listing`, { id: id });
    const listing = await res.data.listing;
    houseListing.value = listing;
  } catch (error) {
    console.log(error);
  }
}

// Fetch listing
onBeforeMount(async () => {
  await fetchListing();
});
</script>

<template>
  <div class="w-full lg:w-[1130px] mx-auto h-auto">
    <div
      v-if="!houseListing"
      class="flex justify-center items-center text-center lg:h-[860px] h-96"
    >
      <Loading />
    </div>
    <ListingHeader v-else :listing="houseListing!" />
  </div>
</template>
