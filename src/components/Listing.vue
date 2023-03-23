<script setup lang="ts">
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import heartIcon from "@/components/icons/heartIcon.vue";
import HeartIconDark from "@/components/icons/HeartIconDark.vue";
import NextIcon from "@/components/icons/NextIcon.vue";
import PreviousIcon from "@/components/icons/PreviousIcon.vue";

import { withDefaults, defineProps, ref, computed } from "vue";
import { formatDate } from "@/helpers/helpers";
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store/index";
import { uselistingStore } from "@/store/listing";

import { houseSchema } from "@/temp/types";

const props = withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);

const session = useSessionStore();
const listing = uselistingStore();
const store = useRootStore();
const isBookmarked = computed(
  () =>
    listing.$state.bookmarks.findIndex((elem) => elem === props.listing._id) !==
    -1
);
const imageIndex = ref<number>(0);
const showPrevNext = ref<boolean>(false);

// methods

function handleFavourite() {
  if (!session.$state.userId) {
    store.toggleLogin();
    return;
  } else if (isBookmarked.value) {
    listing.deleteBookmark(props.listing._id);
  } else {
    listing.addBookmark(props.listing._id);
  }
}

function handleNextImage() {
  if (imageIndex.value < props.listing.images.length - 1) {
    imageIndex.value++;
  }
}

function handlePreviousImage() {
  if (imageIndex.value > 0) {
    imageIndex.value--;
  }
}
</script>
<template>
  <div
    class="w-[335px] my-4 bg-white border rounded-lg overflow-hidden hover:bg-gray-100"
  >
    <div
      id="default-carousel"
      class="relative"
      data-carousel="static"
      @mouseenter="showPrevNext = true"
      @mouseleave="showPrevNext = false"
    >
      <transition name="fade">
        <img
          :src="props.listing.images[imageIndex]"
          alt="listing image from kikao"
          loading="eager"
          fetchpriority="true"
          class="object-cover object-center overflow-hidden h-[280px] w-full hover:cursor-pointer"
          width="280"
          height="280"
      /></transition>

      <!-- Slider indicators -->
      <div
        v-if="props.listing.images.length > 1"
        class="absolute z-10 flex space-x-2 -translate-x-1/2 bottom-3 left-1/2"
      >
        <button
          v-for="but in props.listing.images"
          :key="but"
          type="button"
          class="w-1.5 h-1.5 rounded-full"
          :class="
            but === props.listing.images[imageIndex]
              ? ' bg-white'
              : ' bg-gray-500'
          "
          aria-current="false"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
        ></button>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        v-if="props.listing.images.length > 1 && showPrevNext"
        class="absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        @click="handlePreviousImage"
      >
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/70 opacity-90 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <PreviousIcon />
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        class="absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        v-if="props.listing.images.length > 1 && showPrevNext"
        @click="handleNextImage"
      >
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/70 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <NextIcon />
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <div class="px-2.5">
      <div class="mt-1 flex justify-between">
        <div>
          <span class="text-[18px] font-bold app-text"
            >{{ Number(props.listing.rate.price).toLocaleString("en") }} </span
          ><span class="text-base font-semibold app-text pl-1">
            {{ props.listing.rate.countryCode.toLowerCase() }}</span
          >/<span class="text-gray-500 text-lg">{{
            props.listing.rate.duration.toLowerCase()
          }}</span>
        </div>
        <button
          class="flex-none flex items-center justify-center w-9 h-9 rounded-full text-slate-300 border border-slate-200"
          type="button"
          aria-label="Like"
          @click="handleFavourite"
        >
          <HeartIconDark v-if="isBookmarked" />
          <heartIcon v-else class="w-5 h-5" />
        </button>
      </div>
      <router-link :to="'/listing/' + props.listing._id">
        <div>
          <p class="text-black-600 text-[20px] truncate">
            {{ props.listing.name }}
          </p>

          <div class="my-1 truncate text-[17px] text-gray-500 flex">
            <span>{{ props.listing.county }} county</span>
            <p class="h-1 w-1 rounded bg-gray-900 mx-4 my-2.5"></p>
            <span>{{ formatDate(props.listing.createdAt) }}</span>
          </div>
        </div>

        <div class="flex justify-between pb-2 text-sm my-2">
          <div class="flex">
            <BedIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 font-bold mx-2">{{
              props.listing.compartments.bedrooms
            }}</span>
            <span class="font-normal">{{
              props.listing.compartments.bedrooms > 1 ? `Beds` : `Bed`
            }}</span>
          </div>
          <div class="flex">
            <BathtabIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 mx-2 font-bold">{{
              props.listing.compartments.washRooms
            }}</span>
            <span class="font-normal">{{
              props.listing.compartments.washRooms > 1
                ? `Bathrooms`
                : `Bathroom`
            }}</span>
          </div>
          <div class="flex">
            <Yingyang class="w-4 h-4 inline" />
            <span class="text-gray-600 ml-2 mr-1 font-bold">{{
              Number(props.listing.size.toLocaleString()).toLocaleString("en")
            }}</span>
            <span class="font-normal">sqft</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
