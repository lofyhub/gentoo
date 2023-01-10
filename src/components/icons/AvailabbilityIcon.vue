<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    available: boolean;
  }>(),
  {}
);
</script>

<template>
  <span class="h-2 w-2 modal-animation mr-4 inline">
    <span
      class="absolute inline-flex h-2 w-2 animate-ping rounded-full"
      :class="props.available ? `bg-indigo-500` : `bg-red-500`"
    ></span>
  </span>
</template>
