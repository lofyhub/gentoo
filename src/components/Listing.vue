<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import BedIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import Yingyang from "@/components/icons/YingYang.vue";
import ImagePopup from "@/components/popups/ImagePopup.vue";
import heartIcon from "@/components/icons/heartIcon.vue";
import { toastSuccess } from "@/plugins/toast";
import { formatDate } from "@/helpers/helpers";
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store/index";
import { convertBuffer } from "@/helpers/helpers";

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

const session = useSessionStore();
const store = useRootStore();
const showImagePopup = ref(false);
const isBinary = typeof props.images[0] === "string" ? false : true;
// methods

function updateSelectedImg() {
  showImagePopup.value = true;
}

function handleFavourite() {
  if (!session.$state.userId) {
    store.toggleLogin();
    return;
  }
  toastSuccess(`Listing added to favourite`);
}
</script>
<template>
  <div
    class="w-[284px] my-4 mx-2 bg-white shadow-md hover:shadow-lg rounded-md overflow-hidden"
  >
    <img
      :src="
        !isBinary
          ? props.images[props.images.length - 1]
          : convertBuffer(props.images[0])
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
          <span class="text-[20px] font-medium app-text"
            >{{ props.rate.price.toLocaleString() }} </span
          ><span class="text-[20px] font-medium app-text pl-1">
            {{ props.rate.countryCode }}</span
          >/<span class="font-medium text-base">{{ props.rate.duration }}</span>
        </div>
        <button
          class="flex-none flex items-center justify-center w-9 h-9 rounded-full text-slate-300 border border-slate-200"
          type="button"
          aria-label="Like"
          @click="handleFavourite"
        >
          <heartIcon class="w-5 h-5" />
        </button>
      </div>
      <a :href="'/listing/' + props._id">
        <div>
          <p class="font-normal text-gray-900 text-lg truncate">
            {{ props.name }}
          </p>
          <hr class="my-1 h-2" />
          <div class="pt-1 truncate text-base text-gray-600 font-normal flex">
            <span>{{ props.location }}</span>
            <p class="h-1 w-1 rounded bg-gray-700 mx-2 my-2.5"></p>
            <span>{{ formatDate(props.createdAt) }}</span>
          </div>
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
          <div class="flex pr-2">
            <BathtabIcon class="w-4 h-4 fill-indigo-500 inline" />
            <span class="text-gray-600 ml-1 font-bold"
              >{{ props.compartments.washRooms
              }}<span class="ml-1 font-normal">{{
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
      </a>
    </div>
  </div>
  <Teleport to="body">
    <ImagePopup
      v-if="showImagePopup"
      :image="
        !isBinary
          ? props.images[props.images.length - 1]
          : convertBuffer(props.images[0])
      "
      @close="showImagePopup = false"
    />
  </Teleport>
</template>
