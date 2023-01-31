<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "@/store/index";
import { counties } from "@/temp/housestemp";
import VueMultiselect from "vue-multiselect";
import { toastMessage } from "@/plugins/toast";

const rootStore = useRootStore();
const selectedPrice = ref(`Select price range`);
const selectedType = ref(`Select property type`);
const location = ref(`Select location`);
const prices = [
  "3,000 - 10,000",
  "10,000 - 25,000",
  "25,000 - 55,000",
  "55,000 - 300,000",
];
const property = ["Rental", "Airbnb", "Business", "Stays", "Attractions"];

const priceMap: { [key: string]: number } = {
  "3,000 - 10,000": 10000,
  "10,000 - 25,000": 25000,
  "25,000 - 55,000": 55000,
  "55,000 - 300,000": 300000,
};
// methods

function sortListings() {
  if (selectedPrice.value === `Select price range`) {
    toastMessage("Please select a price range");
    return;
  }

  const price = priceMap[selectedPrice.value] || 0;
  rootStore.sortListings(price);
}
</script>
<template>
  <div class="flex justify-center bg-white py-6 h-32">
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
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
            >
            </VueMultiselect>
          </td>
          <td>
            <VueMultiselect
              v-model="selectedPrice"
              :options="prices"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
            >
            </VueMultiselect>
          </td>
          <td>
            <VueMultiselect
              v-model="selectedType"
              :options="property"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
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
