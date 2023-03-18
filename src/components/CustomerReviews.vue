<script setup lang="ts">
import Review from "@/components/Review.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";

import { uselistingStore } from "@/store/listing";
import { useSessionStore } from "@/store/session";
import { userReview } from "@/temp/types";
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

const reviews: userReview[] = computed(() =>
  listingStore.getAuthorReviews(id.value)
);

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
    <div class="mt-16">
      <p class="text-2xl font-medium">
        No user reviews available for
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
      <div class="flex justify-center">
        <button
          class="py-2 px-6 flex rounded-md border border-indigo-500 text-indigo-500 mt-2"
          @click="handleReviewButton"
        >
          {{ store.$state.userId === id ? `Go to listings` : `Leave a review` }}
          <LeftIcon />
        </button>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex justify-center flex-wrap gap-8 w-full lg:w-[1300px] mx-auto"
    :class="reviews.length >= 1 ? `justify-start` : `justify-center`"
  >
    <div v-for="review in reviews" :key="review.created_at">
      <Review :review="review" />
    </div>
  </div>
</template>
