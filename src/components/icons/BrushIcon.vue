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
    fill="none"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <line
      x1="40"
      y1="112"
      x2="216"
      y2="112"
      fill="none"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></line>
    <path
      d="M102.8,152H56a16,16,0,0,1-16-16V64A32,32,0,0,1,72,32H216V136a16,16,0,0,1-16,16H153.2a8,8,0,0,0-7.9,9.1L152,208a24,24,0,0,1-48,0l6.7-46.9A8,8,0,0,0,102.8,152Z"
      fill="none"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></path>
    <line
      x1="184"
      y1="32"
      x2="184"
      y2="80"
      fill="none"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></line>
  </svg>
</template>
