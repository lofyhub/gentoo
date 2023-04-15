<script setup lang="ts">
import UploadIcon from "@/components/icons/Upload.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import GeneratingSpinner from "@/components/icons/generatingSpinner.vue";
import XIcon from "@/components/icons/XIcon.vue";
import Delete from "./icons/Delete.vue";

import { defineEmits, ref, watch } from "vue";
import {
  toastMessage,
  toastError,
  toastSuccess,
  toastWarning,
} from "@/plugins/toast";
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store";
import { env } from "@/env";
import axios from "axios";
import VueMultiselect from "vue-multiselect";

import { counties } from "@/temp/types";
import { commonSizes, houseType } from "@/temp/types";
import router from "@/router";

defineEmits(["close"]);

const store = useSessionStore();
const rootStore = useRootStore();
const loading = ref(false);
const title = ref(``);
const town = ref(``);
const location = ref(``);
const county = ref(``);
const size = ref();
const duration = ref(``);
const parking = ref<boolean>(false);
const description = ref(``);
const selectedFile = ref();
const rent = ref<number>();
const bedrooms = ref<number>();
const bathrooms = ref<number>();
const totalrooms = ref<number>();
const wifi = ref<boolean>(false);
const security = ref<boolean>(false);
const roomNumber = ref<boolean>(false);
const garbageCollection = ref<boolean>(false);
const availability = ref<boolean>(false);
const laundry = ref<"off-site" | "in-unit ">("in-unit ");
const isLaundryAvailable = ref<boolean>(false);
const yearBuilt = ref<number>();
const isGenerating = ref<boolean>(false);
const housetype = ref<string>();
const previewImages = ref<string[]>([]);
const step = ref<number>(0);

const id = store.$state.userId;

// methods

watch(housetype, (newValue) => {
  for (let i = 0; i < commonSizes.length; i++) {
    if (newValue === commonSizes[i].name) {
      size.value = commonSizes[i].size;
    }
  }
});

async function generateListingDescription() {
  if (
    !town.value ||
    !rent.value ||
    !bedrooms.value ||
    !bathrooms.value ||
    !size.value ||
    !duration.value ||
    !title.value ||
    !county.value ||
    !totalrooms.value ||
    !yearBuilt.value ||
    !housetype.value
  ) {
    toastMessage("Fill some details to generate description");
    return;
  }
  try {
    isGenerating.value = true;
    const token = localStorage.getItem("kikao-token");
    if (!token) throw new Error("Token is not found in localStorage");
    const promptText = `generate a house listing description based on the following details, title of the house listing is ${
      title.value
    }, location of the listing is ${
      location.value
    }, availability of roomNumber is either ${roomNumber.value},county is ${
      county.value
    }, wifi availability is either ${wifi.value}, laundry availability is ${
      laundry.value
    },the paratment was built on ${yearBuilt.value},number of bedrooms is ${
      bedrooms.value
    }, rent price is ${rent.value.toLocaleString(
      "en"
    )} and is always in kshs, the apartment also offers security ${
      security.value
    }, the apartment garbage collection can also be either ${
      garbageCollection.value
    }, availability if the house should be set to either ${
      availability.value
    },size of the house is ${
      size.value
    }square feet(sqft),duration of the rent period is in ${
      duration.value
    },number of bathrooms is ${bathrooms.value}, number of totalrooms is ${
      totalrooms.value
    }, availability of parking space is set to ${
      parking.value
    }, the apartment is of ${housetype.value}`;
    const data = {
      promptText: promptText,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const res = await axios.post(`${env}/description`, data, config);
    const generatedText = await res.data.generatedText.trim();
    description.value = generatedText;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toastWarning(error.response.data.message);
    } else {
      toastError(error as string);
    }
  } finally {
    isGenerating.value = false;
  }
}

function handleLaundry() {
  isLaundryAvailable.value = !isLaundryAvailable.value;
}

async function onFileSelected(event: Event) {
  if (!event.target) {
    return;
  }
  const target = event.target as HTMLInputElement;
  if (!target.files) {
    toastError(`No image selected`);
    return;
  }

  selectedFile.value = target.files;

  let imageUrl = [];
  for (const imageFile of target.files) {
    const imageSrc = await getImageDataURL(imageFile);
    imageUrl.push(imageSrc as string);
    previewImages.value = [...imageUrl];
  }
}

function clearPreview(index: number) {
  previewImages.value.splice(index, 1);
  const newSelectedFiles = Array.from(selectedFile.value).slice();
  newSelectedFiles.splice(index, 1);
  selectedFile.value = newSelectedFiles;
}

function getImageDataURL(imageFile: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", () => {
      reject(reader.error);
    });
    reader.readAsDataURL(imageFile);
  });
}

async function postListing() {
  if (
    !description.value ||
    !town.value ||
    !rent.value ||
    !bedrooms.value ||
    !bathrooms.value ||
    !size.value ||
    !duration.value ||
    !title.value ||
    !county.value ||
    !selectedFile.value ||
    !yearBuilt.value
  ) {
    toastMessage("Please fill in all the details");
    return;
  }
  try {
    loading.value = true;
    const token = localStorage.getItem("kikao-token");
    if (!token) throw new Error("Token is not found in localStorage");
    // Create a new FormData object
    let formData = new FormData();

    formData.append("title", title.value);
    formData.append("Id", id);
    formData.append("location", location.value);
    formData.append("price", JSON.stringify(rent.value));
    formData.append("duration", duration.value);
    formData.append("bedrooms", JSON.stringify(bedrooms.value));
    formData.append("totalrooms", JSON.stringify(totalrooms.value));
    formData.append("washrooms", JSON.stringify(bathrooms.value));
    formData.append("parking", JSON.stringify(parking.value));
    formData.append("size", size.value);
    formData.append("wifi", JSON.stringify(wifi.value));
    formData.append("security", JSON.stringify(security.value));
    formData.append("roomnumber", JSON.stringify(roomNumber.value));
    formData.append(
      "garbagecollection",
      JSON.stringify(garbageCollection.value)
    );
    formData.append("laundry", JSON.stringify(isLaundryAvailable.value));
    formData.append("yearbuilt", JSON.stringify(yearBuilt.value));
    formData.append("status", "active");
    formData.append("county", county.value);
    formData.append("year", JSON.stringify(yearBuilt.value));
    formData.append("description", description.value.trim());

    for (let i = 0; i < selectedFile.value.length; i++) {
      formData.append("kikaoimage", selectedFile.value[i]);
    }

    const res = await axios.post(`${env}/user/listings`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    });
    if (res.status === 200) {
      toastSuccess("Your listing has been successfuly posted");
    }

    title.value = "";
    town.value = ``;
    location.value = ``;
    county.value = ``;
    size.value = 0;
    duration.value = ``;
    parking.value = false;
    description.value = ``;
    selectedFile.value = null;
    rent.value = 0;
    bedrooms.value = 0;
    bathrooms.value = 0;
    totalrooms.value = 0;
    housetype.value = "";
    yearBuilt.value = 0;
    (roomNumber.value = false),
      (wifi.value = false),
      (garbageCollection.value = false),
      (security.value = false),
      (isLaundryAvailable.value = false),
      (parking.value = false);
    router.push(`/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return toastWarning(error.response.data.message);
    }
    console.log(error);
    toastError(error as string);
  } finally {
    loading.value = false;
  }
}

function handleNext() {
  console.log("handleNext was called");
  step.value = step.value + 1;
}

function goBack() {
  console.log("imerun");
  if (step.value === 0) {
    return;
  }
  step.value = step.value - 1;
  console.log(step.value);
}
</script>

<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 z-30 flex flex-col items-center justify-center w-full h-screen py-12 bg-gray-600 bg-opacity-60 popup modal-animation dark:bg-opacity-50"
  >
    <div
      class="z-10 w-auto pt-4 overflow-y-auto font-normal bg-white rounded-sm shadow-lg dark:bg-darkBGStop card-animation"
    >
      <div class="flex items-center justify-between w-full px-10 pt-6">
        <h3 class="text-xl font-semibold text-center">
          List Your Property for Free
        </h3>
        <button
          class="w-8 h-8 p-1 bg-gray-300 rounded-full dark:bg-gray-500 focus:outline-none"
          @click="rootStore.toggleShowListing()"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="flex flex-col items-center justify-center w-full px-10 py-6">
        <div class="flex flex-col">
          <div v-if="step === 0">
            <div class="mb-6 -mx-3 md:flex">
              <div class="px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-first-name"
                >
                  Name of your Apartments
                </label>
                <input
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="grid-first-name"
                  type="text"
                  v-model="title"
                  required
                  placeholder="i.e Bestview Apartments"
                />
              </div>
              <div class="px-3 md:w-1/2">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-last-name"
                >
                  County
                </label>
                <div class="relative block w-full pr-3">
                  <VueMultiselect
                    v-model="county"
                    :options="counties"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Pick a county"
                    class="mr-3 font-semibold"
                  >
                  </VueMultiselect>
                </div>
              </div>
            </div>
            <div class="mb-2 -mx-3 md:flex">
              <div class="px-3 md:w-1/2">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-state"
                >
                  Location/street
                </label>
                <input
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="grid-last-name"
                  type="text"
                  v-model="location"
                  required
                  placeholder="i.e Opposite Olando plaza"
                />
              </div>
              <div class="px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-city"
                >
                  City/Town
                </label>
                <input
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="grid-city"
                  type="text"
                  v-model="town"
                  required
                  placeholder="i.e Kisumu"
                />
              </div>
              <div class="px-3 md:w-1/2">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                >
                  RENT PRICE
                </label>
                <input
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  type="number"
                  v-model="rent"
                  placeholder="i.e 8,000"
                  required
                />
              </div>
            </div>
            <!-- start end-->
            <div class="mt-3 mb-2 -mx-3 md:flex">
              <div class="px-3 md:w-1/2">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-state"
                >
                  Duration
                </label>
                <div class="relative block w-full font-semibold">
                  <VueMultiselect
                    v-model="duration"
                    :options="['Month', 'Night', 'Week']"
                    :searchable="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select duration"
                    class="font-semibold text-gray-900 placeholder-gray-500"
                  >
                  </VueMultiselect>
                </div>
              </div>
              <div class="px-3 md:w-1/2 md:mb-0">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-city"
                >
                  No of bathrooms
                </label>
                <input
                  class="relative block w-full appearance-none my-2 rounded border font-semibold border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="grid-city"
                  type="number"
                  v-model="bathrooms"
                  required
                  placeholder="0 if no bathrooms"
                />
              </div>
              <div class="px-3 md:w-1/2">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                >
                  SIZE
                </label>
                <VueMultiselect
                  v-model="housetype"
                  :options="houseType"
                  :searchable="false"
                  :close-on-select="true"
                  :show-labels="false"
                  placeholder="Pick house size"
                  class="mr-3 font-semibold"
                >
                </VueMultiselect>
              </div>
            </div>
            <!-- end bethrooms -->
            <!-- start second -->
            <div class="mt-3 -mx-3 md:flex">
              <div class="px-3 md:w-1/2">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-state"
                >
                  No of Bedrooms
                </label>
                <div class="relative">
                  <input
                    class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="number"
                    v-model="bedrooms"
                    placeholder="0 if bedsitter"
                    required
                  />
                </div>
              </div>
              <div class="px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-city"
                >
                  Total Rooms
                </label>
                <input
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="grid-city"
                  type="number"
                  v-model="totalrooms"
                  required
                  placeholder="Total no of rooms"
                />
              </div>
              <div class="px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="justify-center block mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-city"
                >
                  Year Built
                </label>
                <input
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="grid-city"
                  type="number"
                  v-model="yearBuilt"
                  required
                  placeholder="Year built"
                />
              </div>
            </div>
          </div>
          <div v-if="step === 1" class="">
            <div class="md:w-full">
              <label
                class="justify-center block mb-2 text-sm tracking-wide text-gray-500 uppercase lg:justify-start"
                for="grid-password"
              >
                Select available rental facilities
              </label>
              <div class="flex items-center mt-6">
                <div
                  class="flex flex-wrap justify-center gap-4 lg:justify-start"
                >
                  <div
                    class="flex items-center justify-center mr-4 text-center"
                  >
                    <p
                      @click.self="roomNumber = !roomNumber"
                      class="w-3 h-3 border border-gray-200 rounded-full cursor-pointer ring-2"
                      :class="roomNumber ? `bg-indigo-500` : `bg-white`"
                    ></p>
                    <label
                      for="red-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Room Number</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <p
                      @click="wifi = !wifi"
                      class="w-3 h-3 border border-gray-200 rounded-full cursor-pointer ring-2"
                      :class="wifi ? `bg-indigo-500` : `bg-white`"
                    ></p>
                    <label
                      for="green-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >WIFI</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <p
                      @click="garbageCollection = !garbageCollection"
                      class="w-3 h-3 border border-gray-200 rounded-full cursor-pointer ring-2"
                      :class="garbageCollection ? `bg-indigo-500` : `bg-white`"
                    ></p>
                    <label
                      for="purple-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Garbage Collection</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <p
                      @click="security = !security"
                      class="w-3 h-3 border border-gray-200 rounded-full cursor-pointer ring-2"
                      :class="security ? `bg-indigo-500` : `bg-white`"
                    ></p>
                    <label
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Security</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <p
                      @click="handleLaundry"
                      class="w-3 h-3 border border-gray-200 rounded-full cursor-pointer ring-2"
                      :class="isLaundryAvailable ? `bg-indigo-500` : `bg-white`"
                    ></p>
                    <label
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Laundry</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <p
                      @click="parking = !parking"
                      class="w-3 h-3 border border-gray-200 rounded-full cursor-pointer ring-2"
                      :class="parking ? `bg-indigo-500` : `bg-white`"
                    ></p>
                    <label
                      for="orange-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Parking</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- end second -->
            <div class="mt-2 -mx-3 md:flex">
              <div class="px-3 md:w-full">
                <label
                  class="justify-center block py-4 text-sm font-medium tracking-wide text-gray-500 uppercase lg:justify-start"
                  for="grid-password"
                >
                  Description
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  v-model="description"
                  class="relative block w-full px-3 py-2 my-2 font-semibold text-gray-900 placeholder-gray-700 border border-gray-300 rounded appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  :placeholder="
                    isGenerating
                      ? `Generating your description ...`
                      : `Add any additional information for your prospective tenant here`
                  "
                  required
                ></textarea>
              </div>
            </div>
            <div
              class="flex items-center justify-center py-4 text-center lg:text-start lg:justify-start"
            >
              <div>
                <button
                  @click="generateListingDescription"
                  class="px-6 py-2 font-medium text-white rounded"
                  :class="
                    isGenerating
                      ? `bg-white border border-gray-200`
                      : `bg-indigo-500`
                  "
                >
                  <GeneratingSpinner v-if="isGenerating" />
                  <p v-else>Generate Description</p>
                </button>
                <p class="pt-3 text-sm text-gray-400">
                  Description is generated based on the details you have
                  provided
                </p>
              </div>
            </div>
            <div>
              <!-- start image upload -->
              <div class="pb-5">
                <p
                  class="flex justify-center pb-2 text-sm font-semibold uppercase lg:justify-start"
                >
                  Upload Images
                </p>
                <p class="text-sm text-gray-400">
                  You can upload upto 4 images (1MB each)
                </p>
              </div>
              <div class="flex mb-5">
                <div v-for="(image, index) in previewImages" :key="index">
                  <img
                    :src="image"
                    class="object-cover w-20 mb-1 mr-2 border border-indigo-500 rounded cursor-pointer h-14"
                    srcset=""
                  />
                  <div class="mt-2">
                    <button
                      type="button"
                      class="flex items-center justify-center justify-around text-gray-400 transition-all transform gap-x-1 hover:text-gray-500 hover:fill-gray-500"
                      @click="clearPreview(index)"
                    >
                      <Delete class="w-3 h-3 fill-gray-400" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
              <form class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div
                    class="flex flex-col items-center justify-center pt-2 pb-6"
                  >
                    <UploadIcon />
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      accept="image/jpeg, image/png"
                      name="kikaoimage"
                      @change="onFileSelected"
                      ref="imageInput"
                      multiple
                    />
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PNG, or JPG (MAX. 800x400px)
                    </p>
                  </div>
                </label>
              </form>
              <!-- end image upload -->
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between pt-4 pb-8 mx-10">
        <button
          class="text-gray-600 text-base font-semibold underline underline-offset-8 rounded py-2.5 px-6 flex gap-x-1"
          type="button"
          @click.prevent="goBack"
        >
          <ArrowLeft class="w-3 h-3 mt-1" />Back
        </button>

        <!-- submit button -->
        <button
          class="w-2/5 px-16 py-3 text-base text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
          @click="step === 1 ? postListing() : handleNext()"
        >
          <SpinnerIcon v-if="loading && step === 1" />
          {{ step === 1 ? "Create Listing" : "Next" }}
        </button>
        <!-- end submit button -->
      </div>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
