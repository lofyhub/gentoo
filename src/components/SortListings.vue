<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "@/store/index";
import { counties } from "@/temp/housestemp";
import VueMultiselect from "vue-multiselect";

const store = useRootStore();
const selectedPrice = ref(`Select price range`);
const selectedType = ref(`Select house type`);
const location = ref(`Select location`);
const price = [
  "3,000 - 10,000",
  "10,000 - 25,000",
  "25,000 - 55,000",
  "55,000 - 300,000",
];
const property = ["Rental", "Airbnb", "Business", "Stays", "Attractions"];

// methods

function sortListings() {
  if (!location.value || location.value === `Select location`) {
    return;
  }

  store.sortListing(location.value);
}
</script>
<template>
  <div class="flex justify-center bg-white shadow py-6 h-32">
    <table class="table-fixed">
      <thead>
        <tr>
          <th class="w-56">Location</th>
          <th>Price</th>
          <th>Property type</th>
          <th>Sort</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <VueMultiselect
              v-model="location"
              :options="counties"
              :searchable="false"
              :close-on-select="false"
              :show-labels="false"
              placeholder="Select duration"
            >
            </VueMultiselect>
          </td>
          <td>
            <VueMultiselect
              v-model="selectedPrice"
              :options="price"
              :searchable="false"
              :close-on-select="false"
              :show-labels="false"
              placeholder="Select duration"
            >
            </VueMultiselect>
          </td>
          <td>
            <VueMultiselect
              v-model="selectedType"
              :options="property"
              :searchable="false"
              :close-on-select="false"
              :show-labels="false"
              placeholder="Select duration"
            >
            </VueMultiselect>
          </td>
          <td>
            <button
              type="submit"
              class="py-2 px-12 bg-indigo-500 opacity-100 font-bold text-white rounded mx-4 hover:bg-indigo-600"
              @click="sortListings"
            >
              Sort
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
