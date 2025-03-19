<script setup lang="ts">
import Review from "@/components/Review.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";

import { uselistingStore } from "@/store/listing";
import { useSessionStore } from "@/store/session";
import { userReview } from "@/temp/types";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

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

const reviews = computed(() => {
  const reviews = listingStore.getAuthorReviews(id.value);
  if (reviews) {
    return reviews as userReview[];
  }

  return [] as userReview[];
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
    class="flex flex-wrap justify-center pt-10 text-center item-center h-80"
  >
    <div>
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
          class="flex px-6 py-2 mt-2 text-indigo-500 border border-indigo-500 rounded-md"
          @click="handleReviewButton"
        >
          {{ store.$state.userId === id ? `Go to listings` : `Leave a review` }}
          <LeftIcon />
        </button>
      </div>
    </div>
  </div>
  <div v-else class="">
    <div
      class="flex flex-wrap justify-center gap-8 pt-4"
      :class="
        reviews.length === 1
          ? `justify-center`
          : reviews.length > 1
          ? `justify-start`
          : ``
      "
    >
      <Review
        v-for="review in reviews"
        :key="review.created_at"
        :review="review"
      />
    </div>
  </div>
</template>
