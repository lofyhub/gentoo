<script setup lang="ts">
import { uselistingStore } from "@/store/listing";
import { useSessionStore } from "@/store/session";
import { computed } from "@vue/reactivity";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

const listingStore = uselistingStore();
const store = useSessionStore();
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

// methods

function handleReviewButton() {
  router.push("/");
  return;
}
</script>

<template>
  <div
    v-if="Object.keys(reviews).length === 0"
    class="flex justify-center flex-wrap item-center text-center pt-4"
  >
    <div>
      <p>
        Sorry, there are currently no user comments or reviews available for
        {{
          store.$state.userId === id
            ? `your posted listings`
            : `this home owner`
        }}
      </p>
      <p class="my-3">
        {{
          store.$state.userId === id
            ? `Please check back later sometime`
            : `Please check back later or be the first to leave a review!`
        }}
      </p>
      <button
        class="py-2.5 px-6 rounded-md border border-indigo-500 text-indigo-500 mt-2"
        @click="handleReviewButton"
      >
        {{
          store.$state.userId === id ? `Go to your listings` : `Leave a review`
        }}
      </button>
    </div>
  </div>

  <div v-else class="flex justify-center flex-wrap item-center text-center">
    <!-- TODO: handle review showcse cards here -->
  </div>
</template>
