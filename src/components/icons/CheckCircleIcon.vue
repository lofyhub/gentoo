<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: `rgb(79 70 229)`,
  }
);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <polyline
      points="172 104 113.3 160 84 132"
      fill="none"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></polyline>
    <circle
      cx="128"
      cy="128"
      r="96"
      fill="none"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></circle>
  </svg>
</template>
