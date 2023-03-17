<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import { houseSchema } from "@/temp/types";
import { formatDate } from "@/helpers/helpers";
import Delete from "@/components/icons/Delete.vue";
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import ConfirmPopup from "@/components/popups/ConfirmPopup.vue";
import { useSessionStore } from "@/store/session";

const props = withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);

const showConfirm = ref(false);
const session = useSessionStore();
</script>

<template>
  <div
    class="w-[330px] my-4 bg-white border rounded-lg overflow-hidden hover:bg-gray-100"
  >
    <div id="default-carousel" class="relative" data-carousel="static">
      <img
        :src="props.listing.images[props.listing.images.length - 1]"
        alt="listing image from kikao"
        class="object-cover object-center overflow-hidden h-[230px] w-full hover:cursor-pointer"
      />
      <!-- Slider indicators -->
      <div
        v-if="props.listing.images.length > 1"
        class="absolute z-10 flex space-x-2 -translate-x-1/2 bottom-3 left-1/2"
      >
        <button
          v-for="but in props.listing.images"
          :key="but"
          type="button"
          class="w-1.5 h-1.5 rounded-full bg-gray-200"
          aria-current="false"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
        ></button>
      </div>
    </div>

    <div class="px-3">
      <div class="mt-2 flex justify-between">
        <div>
          <span class="text-base font-bold app-text"
            >{{ (props.listing.rate.price * 1).toLocaleString("en") }}
            {{ props.listing.rate.countryCode }}</span
          >/<span class="text-gray-500">{{
            props.listing.rate.duration.toLowerCase()
          }}</span>
        </div>
        <div
          v-if="session.$state.userId === listing.userId"
          class="w-8 h-8 rounded-full bg-white border-slate-300 border-2 flex items-center justify-center cursor-pointer"
          @click="showConfirm = true"
        >
          <Delete class="w-5 h-5" />
        </div>
      </div>

      <router-link :to="`/listing/${props.listing._id}`" class="cursor-pointer">
        <div>
          <p class="font-normal text-lg truncate">
            {{ props.listing.name }}
          </p>
          <hr class="my-1 h-2" />
          <span class="text-gray-500 py-1 truncate text-sm flex"
            >{{
              session.$state.userId === props.listing.userId
                ? "You posted on"
                : "Posted on"
            }}
            <p class="h-1 w-1 rounded bg-gray-500 mx-2 my-2"></p>
            <span class="text-sm text-gray-500">{{
              formatDate(props.listing.createdAt)
            }}</span></span
          >
        </div>
        <hr class="my-1 h-2 border-gray-300" />

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
          <div class="flex pr-3">
            <BathtabIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 ml-1 font-bold"
              >{{ props.listing.compartments.washRooms
              }}<span class="ml-2 font-normal">{{
                props.listing.compartments.washRooms > 1
                  ? `Bathrooms`
                  : `Bathroom`
              }}</span></span
            >
          </div>
          <div class="flex">
            <Yingyang class="w-4 h-4 inline" />
            <span class="text-gray-600 ml-1.5 font-bold"
              >{{ Number(props.listing.size).toLocaleString("en")
              }}<span class="font-normal ml-1">sqft</span></span
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <Teleport to="body">
    <ConfirmPopup
      v-if="showConfirm"
      :listingId="props.listing._id"
      :userId="props.listing.userId"
      @close="showConfirm = false"
    />
  </Teleport>
</template>
