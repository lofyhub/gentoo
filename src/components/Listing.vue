<script setup lang="ts">
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import ImagePopup from "@/components/popups/ImagePopup.vue";
import heartIcon from "@/components/icons/heartIcon.vue";
import HeartIconDark from "@/components/icons/HeartIconDark.vue";

import { withDefaults, defineProps, ref, computed } from "vue";
import { formatDate } from "@/helpers/helpers";
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store/index";
import { convertBuffer } from "@/helpers/helpers";
import { uselistingStore } from "@/store/listing";

import { file } from "@/helpers/helpers";
import { houseSchema } from "@/temp/housestemp";

const props = withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);

const session = useSessionStore();
const listing = uselistingStore();
const store = useRootStore();
const showImagePopup = ref(false);
const isBinary = typeof props.listing.images[0] === "string" ? false : true;
const isBookmarked = computed(
  () =>
    listing.$state.bookmarks.findIndex((elem) => elem === props.listing._id) !==
    -1
);

// methods

function updateSelectedImg() {
  showImagePopup.value = true;
}

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
</script>
<template>
  <div
    class="w-[280px] my-4 mx-2 bg-white shadow-md hover:shadow-lg rounded-sm overflow-hidden hover:bg-gray-100"
  >
    <img
      :src="
        !isBinary
          ? props.listing.images[props.listing.images.length - 1]
          : convertBuffer(props.listing.images[0] as unknown as file)
      "
      alt="listing image from kikao"
      loading="lazy"
      class="object-cover object-center overflow-hidden h-[150px] w-full hover:cursor-pointer"
      width="280"
      height="150"
      @click="updateSelectedImg()"
    />
    <div class="px-2.5">
      <div class="mt-1 flex justify-between">
        <div>
          <span class="text-[18px] font-semibold app-text opacity-100"
            >{{ (props.listing.rate.price * 1).toLocaleString("en") }} </span
          ><span class="text-base font-semibold app-text pl-1 opacity-100">
            {{ props.listing.rate.countryCode.toLowerCase() }}</span
          >/<span class="text-gray-500 text-base">{{
            props.listing.rate.duration.toLowerCase()
          }}</span>
        </div>
        <button
          class="flex-none flex items-center justify-center w-9 h-9 rounded-full text-slate-300 border border-slate-200"
          type="button"
          aria-label="Like"
          @click="handleFavourite"
        >
          <HeartIconDark v-if="isBookmarked" class="w-5 h-5" />
          <heartIcon v-else class="w-5 h-5" />
        </button>
      </div>
      <router-link :to="'/listing/' + props.listing._id">
        <div>
          <p class="font-normal text-gray-900 text-lg truncate">
            {{ props.listing.name }}
          </p>
          <hr class="my-1 h-2" />
          <div class="py-.5 truncate text-base text-gray-600 font-normal flex">
            <span class="text-base"> {{ props.listing.county }}</span>
            <p class="h-1 w-1 rounded bg-gray-700 mx-2 my-2.5"></p>
            <span>{{ formatDate(props.listing.createdAt) }}</span>
          </div>
        </div>

        <hr class="my-1 h-2" />

        <div class="flex pb-2 text-sm">
          <div class="flex pr-2">
            <BedIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 font-bold ml-1.5"
              >{{ props.listing.compartments.bedrooms
              }}<span class="ml-1 font-normal">{{
                props.listing.compartments.bedrooms > 1 ? `Beds` : `Bed`
              }}</span></span
            >
          </div>
          <div class="flex pr-2">
            <BathtabIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 ml-1 font-bold"
              >{{ props.listing.compartments.washRooms
              }}<span class="ml-1 font-normal">{{
                props.listing.compartments.washRooms > 1
                  ? `Bathrooms`
                  : `Bathroom`
              }}</span></span
            >
          </div>
          <div class="flex">
            <Yingyang class="w-4 h-4 inline" />
            <span class="text-gray-600 ml-1.5 font-bold"
              >{{ props.listing.size.toLocaleString()
              }}<span class="font-normal ml-[2px]">sqft</span></span
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <Teleport to="body">
    <ImagePopup
      v-if="showImagePopup"
      :image="
        !isBinary
          ? props.listing.images[props.listing.images.length - 1]
          : convertBuffer(props.listing.images[0] as unknown as file)
      "
      @close="showImagePopup = false"
    />
  </Teleport>
</template>
