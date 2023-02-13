<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import { houseSchema } from "@/temp/housestemp";
import { file, formatDate } from "@/helpers/helpers";
import Delete from "@/components/icons/Delete.vue";
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import ConfirmPopup from "@/components/popups/ConfirmPopup.vue";
import { convertBuffer } from "@/helpers/helpers";

const props = withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);

const showConfirm = ref(false);
const isBinary = typeof props.listing.images[0] === "string" ? false : true;
</script>

<template>
  <div
    class="w-[290px] mt-4 mx-2 bg-white shadow-md hover:shadow-lg hover:bg-gray-100 rounded-sm overflow-hidden"
  >
    <img
      :src="
        !isBinary
          ? props.listing.images[props.listing.images.length - 1]
          : convertBuffer(props.listing.images[0] as unknown as file)
      "
      alt="listing image from kikao"
      class="object-cover object-center overflow-hidden h-[150px] w-full hover:cursor-pointer"
    />
    <div class="px-3">
      <div class="mt-2 flex justify-between">
        <div>
          <span class="text-base font-bold app-text"
            >{{ (props.listing.rate.price * 1).toLocaleString("en") }}
            {{ props.listing.rate.countryCode }}</span
          >/<span class="font-normal">{{
            props.listing.rate.duration.toLowerCase()
          }}</span>
        </div>
        <div
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
          <span class="text-gray-500 py-1 truncate text-sm flex"
            >You posted on
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
              >{{ props.listing.size
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
