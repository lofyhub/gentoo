<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "@/store/index";
import { counties } from "@/temp/housestemp";

const store = useRootStore();
const dateSelected = ref(``);
const selectedPrice = ref(`Select price range`);
const selectedType = ref(`Select house type`);
const location = ref(`Select location`);

// methods

function sortListings() {
  if (!location.value || location.value === `Select location`) {
    return;
  }

  store.sortListing(location.value);
}
</script>
<template>
  <div class="flex justify-center bg-white shadow-md h-24">
    <div class="h-12 w-52 ml-5">
      <div class="py-2">
        <label for="price" class="block mb-2 dark:text-white">Location</label>
        <select
          id="price range"
          v-model="location"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-50 focus:border-indigo-50 block py-0.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected class="">Select location</option>
          <option v-for="county in counties" :key="county" :value="county">
            {{ county }}
          </option>
        </select>
      </div>
    </div>
    <div class="h-12 w-52">
      <div class="py-2">
        <h2>Select date</h2>
        <input
          type="date"
          name=""
          id=""
          v-model="dateSelected"
          class="py-[0.1px] px-1 mt-1 mt-2 block border bg-gray-50 text-gray-900 border-gray-200 rounded-lg"
        />
      </div>
    </div>
    <div class="h-12 w-52">
      <div class="py-2">
        <label for="price" class="block mb-2 dark:text-white">Price</label>
        <select
          id="price range"
          v-model="selectedPrice"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-50 focus:border-indigo-50 block py-0.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected class="">Select price range</option>
          <option value="3,000 - 10,000">3,000 - 10,000</option>
          <option value="10,000 - 25,000">10,000 - 25,000</option>
          <option value="25,000 - 55,000">25,000 - 55,000</option>
          <option value="55,000 - 300,000">55,000 - 300,000</option>
        </select>
      </div>
    </div>
    <div class="h-12 w-52">
      <div class="py-2">
        <label for="price" class="block mb-2 dark:text-white"
          >Property type</label
        >
        <select
          id="price range"
          v-model="selectedType"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-50 focus:border-indigo-50 block py-0.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected class="">Select house type</option>
          <option value="rental">Rental</option>
          <option value="airbnb">Airbnb</option>
        </select>
      </div>
    </div>
    <div class="h-12 w-32">
      <div class="pt-7">
        <button
          type="submit"
          class="py-2 px-8 bg-indigo-500 font-bold text-white rounded-sm"
          @click="sortListings"
        >
          Sort
        </button>
      </div>
    </div>
  </div>
</template>
