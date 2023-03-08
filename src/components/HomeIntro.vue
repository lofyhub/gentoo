<script setup lang="ts">
import SortListings from "@/components/SortListings.vue";
import { onMounted, defineEmits } from "vue";

import { sortParams } from "@/temp/types";

onMounted(() => {
  const obj = document.getElementById("value");
  const obj2 = document.getElementById("valuee");
  animateValue(obj, 0, 50, 500);
  animateValue(obj2, 0, 10, 500);
});

const emits = defineEmits(["sortValues"]);

// methods
function handleSort(values: sortParams) {
  emits("sortValues", values);
}
function animateValue(
  obj: HTMLElement | null,
  start: number,
  end: number,
  duration: number
) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    if (obj !== null) {
      obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
</script>

<template>
  <div class="">
    <div
      class="text-black bg-[url('https://images.pexels.com/photos/309742/pexels-photo-309742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center h-[260px]"
    >
      <div class="absolute inset-0 bg-gray-50 bg-opacity-50"></div>
      <div
        class="flex absolute inset-0 flex-wrap justify-around w-full sm:w-4/5 lg:w-[1200px] mx-auto"
      >
        <div class="text-center pt-12">
          <div class="my-2">
            <p class="h3 lg:text-5xl text-4xl pb-2 font-bold">
              Say Goodbye to house hunting forever
            </p>
            <p class="my-2 text-base">
              Find rental properties, commercial spaces, land, and more on our
              platform
            </p>
          </div>
          <div class="flex mb-4 justify-center">
            <div class="mr-20 mt-2 flex">
              <div class="text-xl app-text text-black flex font-medium">
                <p id="value">50 k+</p>
              </div>
              <p class="ml-2">tenants</p>
            </div>
            <div class="mt-2 flex">
              <div class="text-xl app-text flex text-black font-medium">
                <p id="valuee">10 k+</p>
              </div>
              <span class="ml-2">listed properties</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-[1200px] lg:mx-auto relative -mt-12">
      <SortListings
        class="w-full mx-auto rounded-md"
        @sort-params="handleSort"
      />
    </div>
  </div>
</template>
