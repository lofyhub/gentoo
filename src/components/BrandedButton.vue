<script setup lang="ts">
import { toRefs, withDefaults, defineProps } from "vue";

import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

const props = withDefaults(
  defineProps<{
    text: string;
    action?: () => void;
    loading?: boolean;
  }>(),
  {
    action: () => null,
  }
);

const { text } = toRefs(props);

//methods
function triggerAction() {
  props.action();
}
</script>
<template>
  <button
    class="text-white focus:outline-none transform rounded-md font-bold transition duration-500 ease-in-out hover:shadow-lg hover:bg-indigo-600"
    :class="
      props.text === 'Login'
        ? `text-indigo-500 border-2 border-gray-200`
        : `bg-indigo-500 `
    "
    :style="
      props.text === 'Login'
        ? `padding: 0.4rem 1.4rem`
        : `padding: 0.6rem 1.4rem`
    "
    @click="triggerAction()"
  >
    <span v-show="!loading" class="font-sans" style="font-size: 0.95rem">
      {{ text }}
    </span>
    <SpinnerIcon v-show="loading" style="padding: 0.2em" />
  </button>
</template>
