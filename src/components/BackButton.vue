<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

import MaterialSymbolsArrowBackIosNew from "@/components/icons/MaterialSymbolsArrowBackIosNew.vue";

const router = useRouter();
const route = useRoute();
// methos
function goBack() {
  router.go(-1);
}
</script>
<template>
  <button
    class="focus:outline-none transform flex rounded-md font-normal transition duration-500 ease-in-out text-indigo-400"
    @click="goBack()"
  >
    <MaterialSymbolsArrowBackIosNew class="fill-indigo-400 inline w-5 h-6" />
    <span class="font-sans ml-2" style="font-size: 1rem">
      Back to {{ route.name ? `${route.name as string}` : `` }}
    </span>
  </button>
</template>
