<script setup lang="ts">
import { useRootStore } from "@/store";
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import { computed } from "@vue/reactivity";
import { formatDate } from "@/helpers/helpers";

const rootStore = useRootStore();
const homeSample = computed(
  () =>
    rootStore.$state.listings[
      Math.floor(Math.random() * (rootStore.$state.listings.length - 2) + 1)
    ]
);
</script>

<template>
  <div
    class="flex flex-wrap justify-around my-8 w-full sm:w-4/5 lg:w-[1120px] mx-auto pb-6"
  >
    <div class="w-full lg:w-2/4 sm:w-full">
      <div class="leading-relaxed">
        <h1 class="text-5xl font-semi-bold my-4">
          Say <span class="app-text">Goodbye</span> to house hunting forever
        </h1>
        <p class="my-3 text-lg">
          Experience the ultimate rental search with Kikao - discover your
          perfect home from our wide selection of top-quality listings, complete
          with stunning high-resolution photos from locations nationwide
        </p>
      </div>
      <div class="flex mt-8">
        <div class="border-l-2 border-gray-400 pl-8 mr-20 my-2">
          <p class="text-xl app-text font-normal">50K+</p>
          <span>tenants</span>
        </div>
        <div class="border-l-2 border-gray-400 my-2 pl-8">
          <p class="text-xl app-text font-normal">10K+</p>
          <span>listed properties</span>
        </div>
      </div>
    </div>
    <!-- start card img section -->
    <div v-if="homeSample" class="mt-8">
      <router-link
        :to="'/listing/' + homeSample._id"
        class="bg-white leading-relaxed"
      >
        <div class="rounded-sm shadow-md hover:shadow-lg overflow-hidden w-80">
          <img
            :src="homeSample.images[homeSample.images.length - 1]"
            alt=""
            class="object-cover object-center overflow-hidden w-full h-40"
          />
          <div class="px-4">
            <div class="mt-2 flex justify-between">
              <div>
                <span class="text-xl font-medium app-text"
                  >{{ homeSample.rate.price.toLocaleString() }}
                  {{ homeSample.rate.countryCode }}</span
                >/<span class="">{{ homeSample.rate.duration }}</span>
              </div>
            </div>
            <div>
              <p class="font-normal text-xl">{{ homeSample.name }}</p>
              <span class="text-gray-500 py-1 truncate flex"
                >{{ homeSample.location }}
                <p class="h-1 w-1 rounded bg-gray-500 mx-2 my-3"></p>
                <span class="text-sm text-gray-500 py-1">{{
                  formatDate(homeSample.createdAt)
                }}</span></span
              >
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
                  >{{ homeSample.size.slice(0, homeSample.size.length - 2) }}
                  <span class="font-normal">m2</span></span
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
