<script setup lang="ts">
import { uselistingStore } from "@/store/listing";
import { computed } from "@vue/reactivity";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

const listingStore = uselistingStore();
const route = useRoute();
const router = useRouter();
const id = computed(() => {
  if (typeof route.params.id === "string") {
    return route.params.id;
  }

  throw new Error("Id should be a string!");
});

const reviews = computed(() => listingStore.getAuthorReviews(id.value));

onBeforeMount(() => {
  listingStore.fetchAuthorReviews(id.value);
});
</script>

<template>
  <div
    v-if="Object.keys(reviews).length === 0"
    class="flex justify-center flex-wrap item-center text-center"
  >
    <div>
      <p>
        Sorry, there are currently no user comments or reviews available for
        this home owner.
      </p>
      <p class="my-3">
        Please check back later or be the first to leave a review!
      </p>
      <button
        class="py-3 px-6 rounded bg-indigo-50 text-indigo-500"
        @click="router.push('')"
      >
        Go to user Listings
      </button>
    </div>
  </div>

  <div
    v-else
    class="flex justify-center flex-wrap item-center text-center"
  ></div>
</template>
