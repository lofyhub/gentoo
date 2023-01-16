<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { houseSchema } from "@/temp/housestemp";
import { formatDate } from "@/helpers/helpers";

const props = withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);
</script>

<template>
  <div
    class="flex flex-col items-center bg-white border rounded my-3 shadow-md md:flex-row md:max-w-xl hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      :src="props.listing.images[0]"
      alt=""
    />
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ props.listing.name }}
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ props.listing.location }}
      </p>
      <p class="text-gray-500 text-sm">
        {{ formatDate(props.listing.createdAt) }}
      </p>
    </div>
  </div>
</template>
