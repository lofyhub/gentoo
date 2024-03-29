<script setup lang="ts">
import StartFull from "@/components/icons/StartFull.vue";
import StartEmpty from "@/components/icons/StarEmpty.vue";

import { stringToHslColor, formatDate } from "@/helpers/helpers";
import { userReview } from "@/temp/types";

import { ref, withDefaults, defineProps, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import { uselistingStore } from "@/store/listing";

const props = withDefaults(
  defineProps<{
    review: userReview;
  }>(),
  {}
);

const starRating = ref<number>(props.review.rating);
const listingStore = uselistingStore();
const emptystar = ref<number>(5 - starRating.value);
const backgroundColor = stringToHslColor(props.review.name);
const showFullText = ref<boolean>(false);
const buttonClicked = ref<boolean>(false);
const maxLength = ref<number>(140);
const truncatedText = computed(() => {
  if (props.review.comment.length <= maxLength.value || showFullText.value) {
    return props.review.comment;
  } else {
    return props.review.comment.substring(0, maxLength.value) + " ...";
  }
});
const shouldShowReadMoreButton = computed(
  () => props.review.comment.length > maxLength.value
);
const authorProfile = computed(() =>
  listingStore.getProfile(props.review.user_id)
);

onBeforeMount(() => {
  listingStore.getListingAuthor(props.review.user_id);
});

// methods

function displayFullText() {
  showFullText.value = !showFullText.value;
  buttonClicked.value = !buttonClicked.value;
}
</script>

<template>
  <article class="w-[416px] border border-gray-200 rounded-lg">
    <div class="mx-5 mt-6">
      <div class="flex items-center mb-4 space-x-4">
        <router-link :to="'/' + props.review.user_id">
          <img
            v-if="authorProfile"
            class="object-cover rounded-full w-14 h-14"
            :src="authorProfile.profileImage"
            :alt="authorProfile.username + ' avatar image'"
            :title="authorProfile.username + ' avatar image'"
            loading="eager"
          />
          <span
            v-else
            class="flex items-center justify-center text-base text-center text-white uppercase rounded-full w-14 h-14"
            :style="{ backgroundColor: backgroundColor }"
            >{{ props.review.user_id.slice(0, 2) }}</span
          >
        </router-link>

        <div class="space-y-1 font-medium dark:text-white">
          <p class="text-base font-semibold">{{ props.review.name }}</p>
          <div
            class="flex items-center text-base text-gray-400 dark:text-gray-400"
          >
            <StartFull v-for="i in starRating" :key="i" />
            <div v-if="starRating !== 5" class="flex">
              <StartEmpty v-for="i in emptystar" :key="i" />
            </div>
            <h3
              class="ml-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              {{ props.review.rating }}/5 Rating
            </h3>
          </div>
        </div>
      </div>
      <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed :
          <time datetime="2017-03-03 19:00">{{
            formatDate(props.review.created_at)
          }}</time>
        </p>
      </footer>
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
        {{ truncatedText }}
        <button
          v-if="shouldShowReadMoreButton"
          class="inline text-black underline"
          @click="displayFullText"
        >
          {{ !buttonClicked ? `read more` : `hide` }}
        </button>
      </p>
    </div>
  </article>
</template>
