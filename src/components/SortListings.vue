<script setup lang="ts">
import { ref, defineEmits } from "vue";

import { counties } from "@/temp/types";
import VueMultiselect from "vue-multiselect";
import { toastMessage } from "@/plugins/toast";
import {
  commonSizes,
  housePrice,
  prices,
  emitParams,
  houseType,
} from "@/temp/types";

const selectedPrice = ref(`Select price range`);
const selectedType = ref(`Select property type`);
const location = ref(`Select location`);
const price = ref<number>();
const size = ref<string>(``);

const emit = defineEmits(["sortParams"]);

// methods
function sortListings() {
  if (!location.value || !selectedPrice.value) {
    toastMessage("Please select location and price");
  }

  housePrice.forEach((house) => {
    if (house.pString === selectedPrice.value) {
      price.value = house.price;
    }
  });

  commonSizes.forEach((house) => {
    if (house.name === selectedType.value) {
      size.value = house.size;
    }
  });
  const params: emitParams = {
    location: location.value,
    price: price.value as number,
    size: size.value,
  };
  emit("sortParams", params);
}
</script>
<template>
  <div class="flex justify-center bg-white py-5 h-24 items-center">
    <table class="table-fixed">
      <tbody>
        <tr
          class="flex flex-wrap justify-center gap-2 lg:mt-0 mt-3 lg:flex-row"
        >
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
              :options="houseType"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
            >
            </VueMultiselect>
          </td>

          <button
            type="submit"
            class="py-2 px-12 bg-indigo-500 opacity-100 font-bold text-white rounded mx-4 hover:bg-indigo-600"
            @click="sortListings"
          >
            Sort
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
