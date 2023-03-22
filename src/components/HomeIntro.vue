<script setup lang="ts">
import SortListings from "@/components/SortListings.vue";
import { defineEmits } from "vue";

import { sortParams } from "@/temp/types";

const emits = defineEmits(["sortValues"]);

// methods
function handleSort(values: sortParams) {
  emits("sortValues", values);
}
</script>

<template>
  <div class="bg-white">
    <div
      class="text-black bg-[url('https://images.pexels.com/photos/309742/pexels-photo-309742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center h-80"
    >
      <div
        class="flex inset-0 flex-wrap justify-around w-full sm:w-4/5 lg:w-[1200px] mx-auto"
      >
        <div class="text-center pt-12">
          <div class="my-2">
            <p class="h3 lg:text-5xl text-4xl pb-2 font-bold">
              Say Goodbye to house hunting forever
            </p>
            <p class="my-2 text-base">
              Find rental properties, commercial spaces, land, and more on our
              platform
            </p>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-[1200px] lg:mx-auto">
        <SortListings
          class="w-full mx-auto rounded-md"
          @sort-params="handleSort"
        />
      </div>
    </div>
  </div>
</template>
