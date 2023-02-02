<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

import ArrowLeft from "@/components/icons/ArrowLeft.vue";

const router = useRouter();
const route = useRoute();
// methos
function goBack() {
  router.go(-1);
}
</script>
<template>
  <button
    class="focus:outline-none transform rounded-md font-normal transition duration-500 ease-in-out text-indigo-500 lowercase"
    @click="goBack()"
  >
    <ArrowLeft class="fill-indigo-500 inline w-5 h-6" />
    <span class="font-sans ml-2" style="font-size: 1rem">
      Back to {{ route.name ? `${route.name as string}` : `` }}
    </span>
  </button>
</template>
