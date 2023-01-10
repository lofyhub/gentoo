<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from "vue";

withDefaults(
  defineProps<{
    text: string;
  }>(),
  {}
);

defineEmits(["close", "confirm"]);
</script>

<template>
  <div
    class="popup bg-darkBG dark:bg-gray5 modal-animation fixed top-0 bottom-0 left-0 right-0 z-30 p-5 flex h-full w-full items-center justify-center bg-opacity-25 dark:bg-opacity-25"
    @click.stop="$emit(`close`)"
  >
    <!-- Container -->
    <section>
      <div
        class="w-full lg:w-600 bg-lightBG dark:bg-darkBGStop card-animation z-10 overflow-y-auto rounded-lg p-6 pt-4 shadow-lg"
      >
        <div class="flex items-center">
          <div></div>
          <p class="my-4 text-gray5 dark:text-gray3">
            {{ text }}
          </p>
        </div>
        <div class="flex justify-end items-center">
          <button
            class="text-primary focus:outline-none mr-6"
            @click="$emit(`close`)"
          >
            Cancel
          </button>
          <button
            class="focus:outline-none bg-primary text-lightButtonText transform rounded-lg px-8 py-2 font-bold shadow-lg transition duration-500 ease-in-out"
            @click="$emit(`confirm`)"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style></style>
