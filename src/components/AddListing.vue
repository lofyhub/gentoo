<script setup lang="ts">
import { defineEmits, ref } from "vue";

import UploadIcon from "@/components/icons/Upload.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import { counties } from "@/temp/housestemp";
import { toastMessage, toastError, toastSuccess } from "@/plugins/toast";
import { useSessionStore } from "@/store/session";
import { env } from "@/env";
import axios from "axios";
import VueMultiselect from "vue-multiselect";

defineEmits(["close"]);

const store = useSessionStore();
const loading = ref(false);
const title = ref(``);
const town = ref(``);
const location = ref(``);
const county = ref(``);
const size = ref(``);
const duration = ref(``);
const parking = ref(false);
const description = ref(``);
const selectedFile = ref<File | null>(null);
const rent = ref<number>();
const bedrooms = ref<number>();
const bathrooms = ref<number>();
const totalrooms = ref<number>();

const id = store.$state.userId;
// methods

async function onFileSelected(event: Event) {
  if (!event.target) {
    return;
  }
  const target = event.target as HTMLInputElement;
  if (!target.files) {
    toastError(`No image selected`);
    return;
  }
  selectedFile.value = target.files[0];
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
    !parking.value ||
    !title.value ||
    !county.value
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
    formData.append("size", JSON.stringify(size.value));
    formData.append("status", "active");
    formData.append("county", county.value);
    formData.append("description", description.value);
    if (selectedFile.value) {
      formData.append("kikaoimage", selectedFile.value);
    }

    const res = await axios.post(`${env}/user/listings`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    });

    toastSuccess("Your listing has been successfuly posted");
    console.log(res);
    title.value = "";
    town.value = ``;
    location.value = ``;
    county.value = ``;
    size.value = ``;
    duration.value = ``;
    parking.value = false;
    description.value = ``;
    selectedFile.value = null;
    rent.value = 0;
    bedrooms.value = 0;
    bathrooms.value = 0;
    totalrooms.value = 0;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center pb-6">
    <h3 class="text-center text-xl font-medium py-6">
      Register Your Property for Free
    </h3>
    <div class="flex flex-col">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-first-name"
          >
            Title of the listing
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="grid-first-name"
            type="text"
            v-model="title"
            required
            placeholder="i.e Bestview Apartments"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-last-name"
          >
            County
          </label>
          <div class="relative block w-full pr-3">
            <VueMultiselect
              v-model="county"
              :options="counties"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              placeholder="Pick a county"
              class="mr-3"
            >
            </VueMultiselect>
          </div>
        </div>
      </div>
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-state"
          >
            Location/street
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="grid-last-name"
            type="text"
            v-model="location"
            required
            placeholder="i.e Karen"
          />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-city"
          >
            City/Town
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="grid-city"
            type="text"
            v-model="town"
            required
            placeholder="i.e Kisumu"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
          >
            RENT PRICE
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            type="text"
            v-model="rent"
            placeholder="i.e 8,000"
            required
          />
        </div>
      </div>
      <!-- start end-->
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-state"
          >
            Duration
          </label>
          <div class="relative block w-full">
            <VueMultiselect
              v-model="duration"
              :options="['Month', 'Night', 'Week']"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              placeholder="Select duration"
            >
            </VueMultiselect>
          </div>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-city"
          >
            No of bathrooms
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="grid-city"
            type="number"
            v-model="bathrooms"
            required
            placeholder="0 if no bathrooms"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
          >
            SIZE
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            type="number"
            v-model="size"
            placeholder="Size in square fit"
            required
          />
        </div>
      </div>
      <!-- end bethrooms -->
      <!-- start second -->
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-state"
          >
            No of Bedrooms
          </label>
          <div class="relative">
            <input
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="number"
              v-model="bedrooms"
              placeholder="0 if bedsitter"
              required
            />
          </div>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-city"
          >
            Total Rooms
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="grid-city"
            type="number"
            v-model="totalrooms"
            required
            placeholder="Total no of rooms"
          />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-city"
          >
            Parking
          </label>

          <div class="flex items-center mt-4">
            <div class="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value="true"
                v-model="parking"
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-1"
                class="mr-5 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >YES</label
              >
            </div>
            <div class="flex items-center">
              <input
                checked
                id="default-radio-2"
                type="radio"
                value="false"
                v-model="parking"
                name="default-radio"
                class="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-2"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >NO</label
              >
            </div>
          </div>
        </div>
      </div>
      <!-- end second -->
      <div class="-mx-3 md:flex">
        <div class="md:w-full px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-password"
          >
            Description
          </label>
          <textarea
            id="comment"
            rows="4"
            v-model="description"
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Add any additional information for your prospective tenant here"
            required
          ></textarea>
        </div>
      </div>
      <!-- start image upload -->
      <p class="text-sm uppercase font-semibold py-2">Upload Images</p>
      <form class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-2 pb-6">
            <UploadIcon />
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              accept="image/jpeg"
              name="kikaoimage"
              @change="onFileSelected"
              ref="imageInput"
              multiple
            />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PNG, or JPG (MAX. 800x400px)
            </p>
          </div>
        </label>
      </form>
      <!-- end image upload -->
      <!-- submit button -->
      <div class="py-4">
        <button
          type="submit"
          class="group relative uppercase flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="postListing"
        >
          <SpinnerIcon v-if="loading" />
          <p v-else>Create Listing</p>
        </button>
      </div>
      <!-- end submit button -->
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
