<script setup lang="ts">
import NotFound from "@/components/icons/NotFound.vue";
</script>
<template>
  <div class="flex justify-center h-[700px]">
    <div class="text-center flex flex-col py-20">
      <div>
        <NotFound class="w-[176px] h-[176px] inline-flex" />
      </div>

      <div class="text-black text-xl py-6 font-normal">
        Hmm...this page doesn’t exist. Try searching for something else!
      </div>
      <button
        class="py-2 px-6 bg-indigo-500 w-1/3 mx-auto text-white rounded font-extrabold hover:bg-indigo-600 transition-all"
        type="button"
      >
        Back To Home
      </button>
    </div>
  </div>
</template>
