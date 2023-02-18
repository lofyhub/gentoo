<script setup lang="ts">
import { useRootStore } from "@/store";
import { computed } from "@vue/reactivity";
import { file, formatDate, convertBuffer } from "@/helpers/helpers";

import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import MapPin from "@/components/icons/MapPin.vue";
import ListingSkeleton from "@/components/ListingSkeleton.vue";
import { onMounted } from "vue";

const rootStore = useRootStore();
const homeSample = computed(
  () =>
    rootStore.$state.listings[
      Math.floor(Math.random() * (rootStore.$state.listings.length - 2) + 1)
    ]
);
const isBinary = computed(() =>
  typeof homeSample.value.images[0] === "string" ? false : true
);

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

onMounted(() => {
  const obj = document.getElementById("value");
  const obj2 = document.getElementById("valuee");
  animateValue(obj, 0, 50, 500);
  animateValue(obj2, 0, 10, 500);
});
</script>

<template>
  <div
    class="flex flex-wrap justify-around py-5 w-full sm:w-4/5 lg:w-[1200px] mx-auto"
  >
    <div class="w-full lg:w-2/4 sm:w-full text-center lg:text-left">
      <div class="lg:w-full w-4/5 mx-auto">
        <h1 class="h3 lg:text-5xl text-4xl pb-2 font-bold">
          Say
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400"
            >Goodbye</span
          >
          to house hunting forever
        </h1>
        <p class="my-2 text-base">
          Whether you're looking for a rental, a place for your business, or
          even a spot for a short-term stay, we've got you covered. Our platform
          features a wide range of properties, from apartments and houses to
          commercial spaces and land.
        </p>
      </div>
      <div class="flex py-2 lg:justify-start justify-center">
        <div class="border-l-2 border-gray-400 pl-8 mr-20 my-2">
          <div class="text-xl app-text font-normal flex">
            <p id="value">50</p>
            <p>K+</p>
          </div>
          <span>tenants</span>
        </div>
        <div class="border-l-2 border-gray-400 my-2 pl-8">
          <div class="text-xl app-text font-normal flex">
            <p id="valuee">10</p>
            <p>K+</p>
          </div>
          <span>listed properties</span>
        </div>
      </div>
    </div>
    <!-- start card img section -->
    <div v-if="!homeSample" class="flex flex-wrap">
      <ListingSkeleton v-for="i in 1" :key="i" class="w-full" />
    </div>
    <div v-else>
      <router-link
        :to="'/listing/' + homeSample._id"
        class="bg-white leading-relaxed"
      >
        <div
          class="rounded-sm shadow-md hover:shadow-lg hover:bg-gray-100 overflow-hidden w-80"
        >
          <img
            :src="
        !isBinary
          ? homeSample.images[homeSample.images.length - 1]
          : convertBuffer( homeSample.images[0] as unknown as file)
      "
            alt=""
            class="object-cover object-center overflow-hidden w-full h-32"
          />
          <div class="px-4">
            <div class="mt-2 flex justify-between">
              <div>
                <span class="text-[20px] font-medium app-text"
                  >{{ (homeSample.rate.price * 1).toLocaleString("en") }} </span
                ><span class="text-base font-medium text-indigo-500 ml-1">{{
                  homeSample.rate.countryCode
                }}</span>
                <span class=""
                  >/{{ homeSample.rate.duration.toLowerCase() }}</span
                >
              </div>
            </div>
            <div>
              <p class="font-normal text-xl">{{ homeSample.name }}</p>
              <div class="flex text-gray-500 py-2">
                <span class="truncate"
                  ><MapPin class="w-5 h-5 mr-1 inline mb-1.5" />
                  {{ homeSample.county }}
                </span>
                <p class="h-1 w-1 rounded bg-gray-500 mx-2 my-3"></p>
                <span class="truncate">{{
                  formatDate(homeSample.createdAt)
                }}</span>
              </div>
            </div>
            <hr class="my-2 h-2" />
            <div class="flex justify-between pb-2 text-sm">
              <div class="flex justify-between">
                <BedIcon class="w-4 h-4 fill-indigo-500 inline" />
                <span class="text-gray-600 ml-2 font-bold"
                  >{{ homeSample.compartments.bedrooms }}
                  <span class="ml-0.5 font-normal">{{
                    homeSample.compartments.bedrooms > 1 ? `Beds` : `Bed`
                  }}</span></span
                >
              </div>
              <div class="flex justify-between">
                <BathtabIcon class="w-4 h-4 fill-indigo-500 inline" />
                <span class="text-gray-600 ml-2 font-bold"
                  >{{ homeSample.compartments.washRooms
                  }}<span class="ml-1 font-normal">{{
                    homeSample.compartments.washRooms > 1
                      ? `Bathrooms`
                      : `Bathroom`
                  }}</span></span
                >
              </div>
              <div class="flex justify-between">
                <Yingyang class="w-4 h-4 inline" />
                <span class="text-gray-600 ml-2 font-bold"
                  >{{ (homeSample.size * 1).toLocaleString("en") }}
                  <span class="font-normal">sqft</span></span
                >
              </div>
            </div>
          </div>
        </div></router-link
      >
    </div>
  </div>
  <hr class="border-gray-200 dark:border-gray-700" />
</template>
