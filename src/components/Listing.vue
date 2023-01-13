<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import heartIcon from "@/components/icons/heartIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import ImagePopup from "@/components/popups/ImagePopup.vue";
import { toastSuccess } from "@/plugins/toast";

const props = withDefaults(
  defineProps<{
    _id: string;
    name: string;
    location: string;
    images: string[];
    rate: {
      price: number;
      duration: string;
      countryCode: string;
    };
    compartments: {
      bedrooms: number;
      totalRooms: string;
      washRooms: number;
      parking: boolean;
    };
    size: string;
    createdAt: string;
    status: string;
  }>(),
  {}
);

const selectedimg = ref(``);
const showImagePopup = ref(false);
// methods

function updateSelectedImg(img: string) {
  selectedimg.value = img;
  showImagePopup.value = true;
}

function handleFavourite() {
  toastSuccess(`Listing added to favourite`);
}
</script>
<template>
  <div
    class="w-[280px] mt-8 mr-5 bg-white shadow-md hover:shadow-lg rounded-sm overflow-hidden"
  >
    <img
      :src="props.images[props.images.length - 1]"
      alt="listing image from kikao"
      class="object-cover object-center overflow-hidden h-[150px] w-full hover:cursor-pointer"
      @click="updateSelectedImg(props.images[props.images.length - 1])"
    />
    <div class="px-3">
      <div class="mt-2 flex justify-between">
        <div>
          <span class="text-base font-bold app-text"
            >{{ props.rate.price.toLocaleString() }}
            {{ props.rate.countryCode }}</span
          >/<span class="font-normal">{{ props.rate.duration }}</span>
        </div>
        <div
          class="w-8 h-8 rounded-full border-slate-300 border-2 flex items-center justify-center hover:cursor-pointer"
          @click="handleFavourite"
        >
          <heartIcon class="w-5 h-5" />
        </div>
      </div>
      <router-link :to="'/listing/' + props._id">
        <div>
          <p class="font-normal text-lg truncate">{{ props.name }}</p>
          <span class="text-gray-500 py-1 truncate text-sm">{{
            props.location
          }}</span>
        </div>
        <hr class="my-1 h-2" />

        <div class="flex pb-2 text-sm">
          <div class="flex pr-2">
            <BedIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 font-bold ml-1.5"
              >{{ props.compartments.bedrooms
              }}<span class="ml-1 font-normal">{{
                props.compartments.bedrooms > 1 ? `Beds` : `Bed`
              }}</span></span
            >
          </div>
          <div class="flex pr-3">
            <BathtabIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 ml-1 font-bold"
              >{{ props.compartments.washRooms
              }}<span class="ml-2 font-normal">{{
                props.compartments.washRooms > 1 ? `Bathrooms` : `Bathroom`
              }}</span></span
            >
          </div>
          <div class="flex">
            <Yingyang class="w-4 h-4 inline" />
            <span class="text-gray-600 ml-1.5 font-bold"
              >{{ props.size.slice(0, 3)
              }}<span class="font-normal ml-1">m2</span></span
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <Teleport to="body">
    <ImagePopup
      v-if="showImagePopup"
      :image="selectedimg"
      @close="showImagePopup = false"
    />
  </Teleport>
</template>
