<script setup lang="ts">
import KenyanFlag from "@/components/icons/KenyanFlag.vue";
import StartFull from "@/components/icons/StartFull.vue";
import StartEmpty from "@/components/icons/StarEmpty.vue";

import { stringToHslColor } from "@/helpers/helpers";

import { ref } from "vue";

const starRating = ref<number>(4);
const emptystar = ref<number>(5 - starRating.value);
const name = ref<string>("John Philip");
const backgroundColor = stringToHslColor(name.value);
</script>

<template>
  <article class="w-[500px] border border-gray-200 mt-3 mx-3 rounded">
    <div class="mx-5 mt-6">
      <div class="flex items-center mb-4 space-x-4">
        <span
          class="w-14 h-14 rounded-full text-center flex justify-center items-center uppercase text-white text-base"
          :style="{ backgroundColor: backgroundColor }"
          >{{ name.slice(0, 2) }}</span
        >
        <div class="space-y-1 font-medium dark:text-white">
          <p>{{ name }}</p>
          <div
            class="flex items-center text-base text-gray-400 dark:text-gray-400"
          >
            <KenyanFlag class="w-5 h-5 mr-2" />
            Kenya
          </div>
        </div>
      </div>
      <div class="flex items-center mb-1">
        <StartFull v-for="i in starRating" :key="i" />
        <div v-if="starRating !== 5" class="flex">
          <StartEmpty v-for="i in emptystar" :key="i" />
        </div>
        <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
          {{ starRating }}/5 Rating
        </h3>
      </div>
      <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed on :
          <time datetime="2017-03-03 19:00">March 3, 2017</time>
        </p>
      </footer>
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time, popped on an identical strap from another Invicta and went in the
        shower with it to test the waterproofing.... No problems.
      </p>
    </div>
  </article>
</template>
