<script setup lang="ts">
import { defineEmits, ref } from "vue";

import UploadIcon from "@/components/icons/Upload.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import { counties } from "@/temp/housestemp";

defineEmits(["close"]);

const loading = ref(false);

// methods

function postListing() {
  loading.value = true;
  return;
}
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center pb-6">
    <h3 class="text-2xl font-bold pt-6 pb-8">
      Register Your Property for Free
    </h3>
    <div class="px-8 flex flex-col">
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
            required
            placeholder="i.e Bestview Apartments"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-last-name"
          >
            Location/street
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="grid-last-name"
            type="text"
            required
            placeholder="i.e Karen"
          />
        </div>
      </div>
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-state"
          >
            County
          </label>
          <div class="relative">
            <select
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="grid-state"
            >
              <option v-for="county in counties" :key="county">
                {{ county }}
              </option>
            </select>
          </div>
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
            placeholder="i.e 8,000"
            required
          />
        </div>
      </div>
      <!-- start second -->
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2"
            for="grid-state"
          >
            Duration
          </label>
          <div class="relative">
            <select
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="grid-state"
              required
            >
              <option>Night</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
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
                value=""
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
                value=""
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
        <div class="md:w-1/2 px-3">
          <label
            class="block tracking-wide text-grey-darker text-xs font-semibold mb-2"
          >
            SIZE in square feet
          </label>
          <input
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            type="text"
            placeholder="i.e 120"
          />
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
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Add any additional information for your prospective tenant here"
            required
          ></textarea>
        </div>
      </div>
      <!-- start image upload -->
      <p class="text-sm uppercase font-semibold py-2">Upload Images</p>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-2 pb-6">
            <UploadIcon />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PNG, or JPG (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>
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
