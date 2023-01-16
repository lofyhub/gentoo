<script setup lang="ts">
import Document from "@/components/icons/Document.vue";
</script>

<template>
  <div
    class="w-full sm:w-1/2 lg:w-full p-3 bg-white hover:bg-indigo-50 font-normal flex flex-wrap justify-between h-26 border-b border-gray-100 align-middle px-4"
  >
    <p class="text-gray-500 text-base align-middle py-6">Dec, 9,11:00 AM</p>
    <div class="flex">
      <img
        src="https://images.pexels.com/photos/12766613/pexels-photo-12766613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        srcset=""
        class="w-28 h-16 rounded bg-image mt-2"
      />
      <div class="px-4 py-3">
        <p class="font-semibold text-1xl">Beverly Hill</p>
        <span class="text-gray-500 text-sm">Faraja Eldoret Roadblock</span>
      </div>
    </div>
    <div class="py-5">
      <button
        class="py-1 px-4 border border-gray-500 rounded flex text-base font-normal bg-white"
      >
        <Document class="w-5 mr-1" /> View details
      </button>
    </div>
  </div>
</template>
